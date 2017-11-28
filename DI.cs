using Microsoft.Extensions.DependencyInjection;
using MarketCarpenterCore.Ext.MojoTemplateEngine;

namespace MarketCarpenterCore
{
    public class Dependency
    {
        private static ServiceProvider _provider = null;
        public static ServiceProvider Provider
        {
            get { return _provider;}
        }
        
        public static void Init()
        {
            var col = new ServiceCollection();
            col.AddMojoTemplateEngine();
            _provider = col.BuildServiceProvider();
        }

        #region Helpers
        public static IEngine TemplateEngine
        {
            get { return _provider.GetService<IEngine>(); }
        }
        #endregion
    }
}