using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.NodeServices;
namespace MarketCarpenterCore.Ext.MojoTemplateEngine
{
    public static class Extension
    {
        public static void AddMojoTemplateEngine(this IServiceCollection col)
        {
            col.AddNodeServices();
            col.AddSingleton<IEngine, Engine>();
        }
    }
}