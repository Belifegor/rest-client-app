# REST Client

## Framework Options

You can choose from several modern React frameworks for your project. All of these support server-side logic, routing, and are suitable for building full-stack React applications:

- **React Router 7 (Framework mode)**: The latest version of React Router, now with features merged from Remix. [Docs](https://reactrouter.com/start/modes#framework)
- **Next.js (App Router)**: The recommended way to use Next.js for full-stack React apps. [Docs](https://nextjs.org/docs/app)
- **Tanstack Start**: A modern, full-stack React framework from the creators of TanStack Query. [Docs](https://tanstack.com/start/latest)
- **Waku**: A minimal React framework for building full-stack apps. [Docs](https://waku.gg/)

You are free to choose any of these options based on your team's preferences and project requirements.

You will be working on creating a light-weight version of Postman in one app.
PLEASE, READ THE TASK DESCRIPTION CAREFULLY UP TO THE END BEFORE STARTING THE TASK

## Theoretical Notes

[**Postman**](https://www.postman.com/) is a rich platform for using (and building) APIs. However, you can use any REST client as a reference.
It should support method selection, URL, headers.

Additional parts which your app will also include:

- Authorization and authentication capabilities, ensuring access to the tool is restricted to authorized users.
- History section, which will redirect the user to a specific section for previously executed requests.

## Building a team

- you should work in a team of 3 members
- you should select a team lead, who will be coordinating the development

## Application Prototype

You can use existing solutions like [Thunder Client for VSCode](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) as a source of inspiration.
However, pay attention that we leave the final decision about the set of tools and design to you to not limit your possibilities and imagination.
Design, prototype, as well as implementation of the application, are up to you.

## Backend / API

- Application doesn't require a backend.
- Application should support any open, user-specified API (RESTful).
- You will use either **Next.js (App Router)** or **React Router 7 (Framework mode)** to make calls to the endpoint through the server. This is how you will avoid issues related to [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).
  - **React Router 7 Framework mode** is the evolution of Remix, as Remix features have been merged into React Router. See [React Router 7 Framework mode docs](https://reactrouter.com/start/modes#framework).
  - **Next.js App Router** is the recommended way to use Next.js for full-stack React apps. See [Next.js App Router docs](https://nextjs.org/docs/app).
  - You may also use **Tanstack Start** ([docs](https://tanstack.com/start/latest)) or **Waku** ([docs](https://waku.gg/)) as alternative modern React frameworks for full-stack development.

## Application structure

Your app must contain:

1. Main page
2. User registration/authentication.
3. RESTful client, which includes:
   - method selector
   - text input for the endpoint URL
   - request editor
   - headers editor
   - response section
   - generated code section
4. Variables
5. History