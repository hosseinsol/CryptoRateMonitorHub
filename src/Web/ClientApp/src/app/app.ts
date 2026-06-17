import { ChangeDetectionStrategy, Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';
import {
  translations,
  cryptoTranslations,
  currencyMetadataFa,
  currencyMetadataEn
} from './translations';
import { CryptoQuoteDto, CryptoQuotesClient, SwaggerException } from './web-api-client';

export interface CryptoRates {
  USD: number;
  EUR: number;
  BRL: number;
  GBP: number;
  AUD: number;
  [key: string]: number;
}

export interface CryptoData {
  code: string;
  name: string;
  rates: CryptoRates;
  change24h: number;
  lastUpdated: string;
  description: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly cryptoQuotesClient = inject(CryptoQuotesClient);

  // Search input controller
  searchControl = new FormControl('BTC', [Validators.required, Validators.minLength(2)]);

  // Signals for state management
  activeCrypto = signal<CryptoData | null>(null);
  isLoading = signal<boolean>(false);
  errorMsg = signal<string | null>(null);

  // Available default fast queries
  recommendations = ['BTC'];

  // Theme state
  currentTheme = signal<'dark' | 'light'>('dark');

  // Language state
  currentLang = signal<'fa' | 'en'>('fa');

  // React translations and metadata imported from translation dictionary
  translations = translations;
  cryptoTranslations = cryptoTranslations;
  currencyMetadataFa = currencyMetadataFa;
  currencyMetadataEn = currencyMetadataEn;

  t = computed(() => this.translations[this.currentLang()]);

  displayedCryptoName = computed(() => {
    const crypto = this.activeCrypto();
    if (!crypto) return '';
    const lookup = this.cryptoTranslations[crypto.code.toUpperCase()];
    if (lookup) {
      return lookup[this.currentLang()].name;
    }
    return crypto.name;
  });

  displayedCryptoDescription = computed(() => {
    const crypto = this.activeCrypto();
    if (!crypto) return '';
    const lookup = this.cryptoTranslations[crypto.code.toUpperCase()];
    if (lookup) {
      return lookup[this.currentLang()].description;
    }
    return crypto.description;
  });

  displayedCurrencyMetadata = computed(() => {
    return this.currentLang() === 'fa' ? this.currencyMetadataFa : this.currencyMetadataEn;
  });

  ngOnInit() {
    if (typeof window === 'undefined') {
      return;
    }
    // Initial fetch for BTC on load
    this.fetchCryptoRates('BTC');
  }

  /**
   * Fetches the latest rates from the ASP.NET Core backend.
   */
  async fetchCryptoRates(code: string) {
    if (typeof window === 'undefined') return;
    if (!code) return;
    const cleanCode = code.trim().toUpperCase();
    this.isLoading.set(true);
    this.errorMsg.set(null);

    try {
      const quote = await firstValueFrom(this.cryptoQuotesClient.getQuote(cleanCode));
      if (!quote?.quotes || Object.keys(quote.quotes).length === 0) {
        throw new Error('ساختار پاسخ دریافتی از سرور نامعتبر است.');
      }

      this.activeCrypto.set(this.mapQuoteToCryptoData(quote, cleanCode));
      // Sync search input value with standard
      this.searchControl.setValue(cleanCode, { emitEvent: false });
    } catch (err: unknown) {
      console.error('Error fetching crypto rates on client:', err);
      this.errorMsg.set(this.getErrorMessage(err, cleanCode));
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Search button click submit handler
   */
  onSearch() {
    if (this.searchControl.valid) {
      const value = this.searchControl.value;
      if (value) {
        this.fetchCryptoRates(value);
      }
    } else {
      this.errorMsg.set('لطفاً یک نماد معتبر رمزارز (حداقل ۲ نویسه) وارد کنید.');
    }
  }

  /**
   * Number formatting helper for Persian templates
   */
  formatRate(num: number): string {
    if (num === undefined || num === null) return '---';
    return Number(num).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    });
  }

  private mapQuoteToCryptoData(quote: CryptoQuoteDto, requestedCode: string): CryptoData {
    const code = (quote.symbol || requestedCode).toUpperCase();
    const translated = this.cryptoTranslations[code]?.en;

    return {
      code,
      name: translated?.name ?? code,
      rates: this.mapRates(quote.quotes),
      change24h: 0,
      lastUpdated: new Date().toISOString(),
      description: translated?.description ?? `Live quote for ${code} from the backend API.`
    };
  }

  private mapRates(quotes?: Record<string, number>): CryptoRates {
    const rates: CryptoRates = {
      USD: 0,
      EUR: 0,
      BRL: 0,
      GBP: 0,
      AUD: 0
    };

    for (const [key, value] of Object.entries(quotes ?? {})) {
      if (typeof value === 'number') {
        rates[key.toUpperCase()] = value;
      }
    }

    return rates;
  }

  private getErrorMessage(err: unknown, symbol: string): string {
    if (SwaggerException.isSwaggerException(err)) {
      if (err.status === 400) {
        return `نماد ${symbol} توسط سرور پشتیبانی نمی‌شود.`;
      }

      return `مشکلی در ارتباط با سرور رخ داده است. پاسخ سرور: ${err.status}`;
    }

    return err instanceof Error
      ? err.message
      : 'خطا در ارتباط با سرور ارائه‌دهنده نرخ رمزارزها. لطفا اتصال اینترنت خود را چک کرده و دوباره تلاش کنید.';
  }
}
