using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using TestHostPrerenderWASM.Client;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

//Be careful we have two entry points to enable the client to be both a standalone app and the client for the server app. 
// removing the below, app.razor, and index.html would put the project back to being just for the testing host (WebAssembly.DevServer could be removed from nuget too)
//if (builder.HostEnvironment.IsProduction()) //qqqq worked but want release mode not to be tied to this
//{
//    builder.RootComponents.Add<App>("#app");
//    builder.RootComponents.Add<HeadOutlet>("head::after");
//    builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

//}
#if GH_PAGE_RELEASE
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
#endif
//qqqqqq this is where it will be failing
await builder.Build().RunAsync();




