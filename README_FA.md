

### معرفی

`CryptoRateMonitor` یک پروژه فول‌استک برای نمایش نرخ رمزارزها بر پایه ASP.NET Core، Clean Architecture، SQL Server و Angular است. بک‌اند نرخ‌ها را از سرویس `exchangeratesapi.io` دریافت می‌کند، قیمت رمزارز انتخاب‌شده را به چند ارز فیات تبدیل می‌کند و فرانت‌اند داخل `src/Web/ClientApp` همان API واقعی را مصرف می‌کند.

### ساختار پروژه

- `src/Domain`: موجودیت‌ها، value objectها و eventهای دامنه.
- `src/Application`: use caseها، validation، pipelineهای MediatR و قراردادهای سرویس‌ها.
- `src/Infrastructure`: EF Core، Identity، SQL Server و سرویس دریافت نرخ ارز.
- `src/Web`: API، Swagger، Razor/SPA hosting و endpointها.
- `src/Web/ClientApp`: برنامه Angular.
- `tests/Application.UnitTests`: تست‌های واحد لایه Application.
- `tests/Application.FunctionalTests`: تست‌های integration/functional برای Web API و pipelineها.

### پیش‌نیازها

- .NET SDK 8
- SQL Server در دسترس پروژه
- Node.js نسخه `20.19+` یا `22.12+` برای Angular 21
- npm

در این ماشین، اگر Node پیش‌فرض قدیمی بود، می‌توانید موقتاً Node جدیدتر را در PATH بگذارید:

```bash
export PATH="$HOME/.nvm/versions/node/v22.13.1/bin:$PATH"
```

### تنظیم دیتابیس در appsettings

آدرس دیتابیس از `src/Web/appsettings.json` خوانده می‌شود:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost,1444; Database=CryptoRateMonitorDb; User Id=sa; Password=Password!23; Trust Server Certificate=True;"
  }
}
```

برای تغییر دیتابیس، مقدار `ConnectionStrings:DefaultConnection` را در همین فایل یا در `src/Web/appsettings.Development.json` override کنید. نام سرور، پورت، نام دیتابیس، یوزر و پسورد باید با SQL Server محلی یا کانتینر شما یکی باشد.

برای تست‌های integration نیز connection string جداگانه در این فایل است:

```text
tests/Application.FunctionalTests/appsettings.json
```

### تنظیم API نرخ ارز

کلید سرویس نرخ ارز از این بخش خوانده می‌شود:

```json
{
  "ExchangeRates": {
    "ApiKey": "YOUR_API_KEY"
  }
}
```

در محیط واقعی بهتر است کلید را با user-secrets، متغیر محیطی یا Key Vault تنظیم کنید و مقدار حساس را داخل سورس نگه ندارید.

### اجرای بک‌اند

از ریشه پروژه:

```bash
dotnet watch run --project src/Web/Web.csproj
```
با استفاده از این دستور کل پروژه اجرا خواهد شد
![swagger](./swagger.png)
![swagger](./ui.png)

بک‌اند به صورت پیش‌فرض روی این آدرس بالا می‌آید:

```text
http://localhost:5000
```

### اجرای فرانت‌اند

فرانت‌اند داخل `src/Web/ClientApp` است:

```bash
cd src/Web/ClientApp
npm install
npm run dev
```

برنامه Angular روی این آدرس در دسترس است:

```text
http://localhost:4200
```

فایل `src/Web/ClientApp/proxy.conf.json` درخواست‌های `/api` را به بک‌اند روی `http://localhost:5000` proxy می‌کند.

### آدرس Swagger

بعد از اجرای بک‌اند، Swagger UI اینجاست:

```text
http://localhost:5000/api
```

فایل OpenAPI/Swagger JSON نیز اینجاست:

```text
http://localhost:5000/api/specification.json
```

نمونه endpoint نرخ رمزارز:

```text
GET http://localhost:5000/api/CryptoQuotes/BTC
```

نمونه پاسخ:

```json
{
  "symbol": "BTC",
  "quotes": {
    "EUR": 50000,
    "USD": 55000,
    "GBP": 42500,
    "AUD": 82500,
    "BRL": 275000
  }
}
```

### build و تست

Build بک‌اند:

```bash
dotnet build src/Web/Web.csproj -p:SkipNSwag=True
```

Build فرانت‌اند:

```bash
cd src/Web/ClientApp
npm run build
```

Lint و تست فرانت‌اند:

```bash
cd src/Web/ClientApp
npm run lint
npm test -- --watch=false
```

تست‌های واحد Application:

```bash
dotnet test tests/Application.UnitTests/Application.UnitTests.csproj
```

تست‌های integration/functional:

```bash
dotnet test tests/Application.FunctionalTests/Application.FunctionalTests.csproj
```

اگر می‌خواهید integration testها به جای SQL Server تعریف‌شده در appsettings، SQL Server موقت Testcontainers بسازند:

```bash
USE_TESTCONTAINERS=true dotnet test tests/Application.FunctionalTests/Application.FunctionalTests.csproj
```

### نکات عیب‌یابی

- اگر Angular خطای نسخه Node داد، Node را به `20.19+` یا `22.12+` ارتقا دهید.
- اگر endpoint نرخ‌ها خطای `429 Too Many Requests` داد، سرویس خارجی نرخ ارز rate limit کرده است.
- اگر اتصال دیتابیس خطا داد، connection string داخل `src/Web/appsettings.json` و باز بودن پورت SQL Server را بررسی کنید.
- اگر Swagger باز نشد، مطمئن شوید بک‌اند روی `http://localhost:5000` اجرا شده باشد.
