namespace CryptoRateMonitor.Application.FunctionalTests;

public static class TestDatabaseFactory
{
    public static async Task<ITestDatabase> CreateAsync()
    {
        var useTestcontainers = string.Equals(
            Environment.GetEnvironmentVariable("USE_TESTCONTAINERS"),
            "true",
            StringComparison.OrdinalIgnoreCase);

        ITestDatabase database = useTestcontainers
            ? new TestcontainersTestDatabase()
            : new SqlServerTestDatabase();

        await database.InitialiseAsync();

        return database;
    }
}
