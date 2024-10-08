## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Step by step guid how to use this :
1. Open localhost:3000  ![image](https://github.com/user-attachments/assets/5ab3035f-a1b3-4675-ba6a-e6f8f6593ed3)
2. Choose option (click on select vehicle) ![image](https://github.com/user-attachments/assets/1fbf2b70-7bfe-44d5-8216-68aed5758eba)
3. Then click to select year  ![image](https://github.com/user-attachments/assets/212b47f7-3e4d-4170-8f32-aa855577b49b)
4. After that, you be able to click Next and go to the next page ![image](https://github.com/user-attachments/assets/9b1b44d0-f6ba-4466-b6da-e5fd2b5b5ca0)
5. Done! You can go back, if wanna choose another option.


*Overview of the Application’s Features and Architecture*
Features:

Vehicle Filtering:
The home page (/) allows users to select a vehicle make and model year from dropdown menus. The makes are fetched from the National Highway Traffic Safety Administration (NHTSA) API, and years are dynamically generated from 2015 to the current year.
Users can navigate to the result page after selecting a vehicle make and year, where they will see models filtered by those parameters.


Dynamic Routes:
Once a make and year are selected, the "Next" button navigates the user to a dynamically generated route: /results/[makeId]/[year]. This route displays the results of the vehicle models corresponding to the selected make and year.


Static Path Generation:
The application uses generateStaticParams to pre-render paths for some popular vehicle makes and recent years. This allows for faster page load times for the most common requests.


Suspense for Data Fetching:
The Suspense component is utilized to show a loading state while fetching vehicle model data on the results page.


Responsive Design:
The UI is styled using Tailwind CSS for responsive design, ensuring the application works well across mobile and desktop screens.


Architecture:
Home Page (page.tsx):

This page contains the vehicle filter form, allowing users to select a make and model year.
The component uses the useState and useEffect hooks to manage the vehicle makes and update the selected values dynamically.
The form makes a fetch request to the NHTSA API for vehicle makes and dynamically generates the options for the year selector.
Result Page (app/results/[makeId]/[year]/page.tsx):

This is the results page that displays vehicle models filtered by the selected make and year.
It uses server-side functions to fetch vehicle models by make and year from the NHTSA API.
A VehicleList component renders the fetched data, displaying the vehicle models in a grid format.
Static Paths (generateStaticParams):

The generateStaticParams function generates static paths for a subset of popular vehicle makes and years, improving performance by pre-rendering frequently accessed pages.


Reusable Components:
The application uses modular and reusable components like Select, Button, and VehicleList to create a clean and maintainable structure.
UI elements such as dropdowns and buttons are abstracted into separate components located in the @/components/ui/ directory.


Tailwind CSS:
All styling is handled using Tailwind CSS, which provides utility-first classes for rapid UI development and responsive design.


Error Handling:
The application includes basic error handling for data fetching, ensuring that users are notified if something goes wrong during API calls.
