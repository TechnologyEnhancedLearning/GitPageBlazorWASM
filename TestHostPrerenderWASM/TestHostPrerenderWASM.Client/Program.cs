using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using TestHostPrerenderWASM.Client;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

//qqqq added
//Be careful we have two entry points to enable the client to be both a standalone app and the client for the server app. 
// removing the below, app.razor, and index.html would put the project back to being just for the testing host (WebAssembly.DevServer could be removed from nuget too)
if (builder.HostEnvironment.IsProduction())
{
    builder.RootComponents.Add<App>("#app");
    builder.RootComponents.Add<HeadOutlet>("head::after");
    builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
    //qqqqq here change the index to gitpage-index so the code is easier to understand that it is both self serving on publish and served by the other project for text
}

await builder.Build().RunAsync();




