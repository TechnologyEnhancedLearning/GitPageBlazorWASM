



# Local Development
- inc the version in local props
	- save
- build package project (debug)
- build solution (debug)
- run
	- for wasm use release and client
	- for hosted wasm use host and debug

## Trouble shooting
- clean restore solution and try again
- look in the sharedpages, look in depenency in solution explorer, open the package version drop down
	- is the version what you expect?
	- is there an error
- if it still doesnt work increment the version and use the process again

## Bonus 
- there is probably a way to increment version with timestamps or build number to automate it more

## extras
- you can use a local feed two visual studio and see new components in LH for example
- LH could be setup to automatically update too, system environment variables may help or a txt file to read in csproj to sinc versions

# About


This is a little project for testing the options for creating a wiki style pages to showcase each component on a github page.
The same setup is ideal for testing as each component has its own page and the browser based no javascript tests require a page
to go to test the component.

The testing project need prerender so needs server host client blazor webassembly so that the static (though we will put our nojs endpoint forms here)
server html prerendered html can be provided before the webassembly which needs javascript to get onto the browser.
If there is no javascript a pure webassembly project will not load anything.

This means testing requires webassembly prerender, github requires pure webassembly.

To acheive both there are two approaches in this project.
For both, and because we are testing and displaying a package ultimately, we need the package project, and a project for components just
for the wiki style component pages.

This leaves us with very slim projects for providing delivering the html/wasm.

Option 1:
Have a prerender project for testing. This involves two project which is standard the server side and the client side.
And have a seperate pure wasm project for github pages.

Option 2:
Put in code in csproj and program.cs into the .client project that is release only. This allows us to publish it as a seperate
project and get a pure wasm project. or run the server project debug for testing which because it is not release still works.

We also need a folder with an index.html end point for this.

Both these options work in this project.

## Details

The 404 page is because the Blazor is a spa the routing does not work as a github page, such that from the blazor entry point page you
can get to and load your pages. But if you refresh those pages github will not find them at that route. 

The 404 is picked up and redirects to index parses the request and index receives it and sends you there to side step this issue.

For the context we are using this project this is an ok approach.

## How it is published
It will need gitactions and it will need a hook maybe enforcing prepush rule to run tests as it may be prerender based test may not run
in the pipeline?

Going into the pure wasm project or .client project and running a publish
 dotnet publish --configuration Release

## Notes
Also DevServer needed adding to .client

# Where to see the site


See the page this creates in github:

See prototype project :
https://github.com/TechnologyEnhancedLearning/MVCBlazor

This project is public which is required to be github page hosted

It should be at 
https://github.com/TechnologyEnhancedLearning.github.io/GitPageBlazorWASM
https://technologyenhancedlearning.github.io/GitPageBlazorWASM/
# References

- [microsoft official docs (didn't actually use these but if end up needing to change it could start here)](https://learn.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/webassembly?view=aspnetcore-8.0#github-pages)
 
# Project structure

<style>
tr th:nth-child(2), 
tr td:nth-child(2) {
  white-space: nowrap;       /* Prevent wrapping */
  overflow: visible;         /* Allow overflow */
  text-overflow: unset;      /* Remove ellipsis or clipping */
  word-wrap: normal;         /* Prevent word breaks */
  word-break: normal;        /* Prevent breaking within words */
}
</style>
# Project Structure
|  Description  | File Structure |
|----------------|-------------|
|   | &#9507; GitPageBlazorWASM |
| The github page is aimed at this and gets the version from gh-page branch. .Client publishes a standalone wasm site here | &#160;&#160;&#160;&#160;&#9507; docs |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; _content |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; Package.BlazorComponentLibrary |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; SharedPages |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; css |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; _framework |
| Because its a spa we need to redirect 404 back to our index page parse them to take users to pages on refresh or if they go there directly | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; 404.html |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; index.html |
| the pure webassembly project which was initially progressive publishes here | &#160;&#160;&#160;&#160;&#9507; docsReferenceNow |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; _content |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; Package.BlazorComponentLibrary |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; SharedPages |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; css |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; _framework |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; index.html |
| just for making wiki style site if we decide to use the .client for testing and for creating the github page site then we dont need this | &#160;&#160;&#160;&#160;&#9507; GitPageBlazorWASMProgressive |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; _Imports.razor |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; App.razor |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; Program.cs |
| This would be out blazor component package | &#160;&#160;&#160;&#160;&#9507; Package.BlazorComponentLibrary |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; _Imports.razor |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; Components |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; SimpleCounter.razor |
| Bunit and E2E tests, the E2E none javascript tests require prerendering and hence the server wasm project for testing | &#160;&#160;&#160;&#160;&#9507; PlaywrightXUnitGoesHere |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; UnitTest1.cs |
| to keep the projects slim, and if we decide to have seperate programs for creating the sites we put the site in a seperate project that everything can use, this wouldnt be packaged | &#160;&#160;&#160;&#160;&#9507; SharedPages |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; _Imports.razor |
|  there is just enough complexity to see things working| &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; Layout |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; ComponentPageLayout.razor |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; MainLayout.razor |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; Pages |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; ComponentPages |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; CounterComponentPage.razor |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; Error.razor |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; Home.razor |
| we need this for prerendering this is the same kind of set up we would use when we consume our libraries (though see MVCBlazor project for actual setup) | &#160;&#160;&#160;&#160;&#9495; TestHostPrerenderWASM |
| slim | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; TestHostPrerenderWASM |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; Components |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; _Imports.razor |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; App.razor |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; Program.cs |
| the client is standalone on release and used by TestHostPrerenderWASM in debug for testing. Look for the release conditions to see how it does both | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; TestHostPrerenderWASM.Client |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; _Imports.razor |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; App.razor |
| if we put these in wwwroot then when running debug we would have two entry points so we keep them here and copy them on publish | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; GitPagesEntryPoint |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; 404.html |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; index.html |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9507; Program.cs |
|  | &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#9495; Routes.razor |
 
