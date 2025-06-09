# Invoice App.

# Project Description: 
An Angular web platform to manage invoices. It allows users to create, read, update 
as well as delete invoices. 


# Setup and run instructions
* First clone or fork the project to have it locally. 
* Navigate into the project directory.
* Run npm install to install all dependencies of the project.

* Run "ng serve" in the project root directory to kickstart it.


# Application features
* View all invoices: the application loads initial invoice data from a local json data file and displays 
                     it on initial startup. This invoice data is then stored in local storage and further
                     interactions are handled in the local storage reference.

* Create an Invoice: the application allows a user to create a new invoice with their own data by clicking
                     on the new invoice button that shows on the startup screen. This opens up a form
                     into which users can add new invoice data and view their additions in real-time.


* View invoice:     users can view details about a particular invoice by simple clicking the "arrow-right"
                    icon on the row of the invoice item of interest on the view all invoices page. 
                    This loads more information about a particular invoice item.


* Edit invoice:    users can also edit invoice data after the original invoice has been created. In the
                   view invoice details page, there is an edit button that provides that functionality.


* Delete invoice:  also, users can delete an invoice item if they will. A delete button in the invoice
                   details page triggers a modal that does just that depending on what the user chooses.


* Filter invoices: on the invoices display page is a filter element that allows users to filter invoices
                   by their status types, Pending, Draft or Paid.



# Component Structure: 
* In the root of the project folder, is a "src" folder that contains all the folders that bring this project to life. 

* An "app" folder, contains a "components" folder that stores all of the components that handle various
routes and application flow.

* There is also a "pipes" component that contains a custom pipe used to prepend a "." to the status of an
invoice to maintain consistency with the design file.

* There is also a "services" folder, containing the "invoice-service" file which defines all of the business
logic used in the project as well as shared data items.

* There is the "shared folder" which defines the invoice shape of the invoice object.

* Then there is the "assets" folder which contains all of the static files and the initial json invoices data

* The "styling" file contains some stylesheets that define re-usable styles 


# Routing overview
* The application has 4 routes handled by 4 components

* The "/invoices" route displays the list of all invoices

* The "/invoices/:id" shows the details of the invoice item whose id matches the one specified in the route

* The "/invoices/new" route loads up the form to add a new invoice

* The /invoices/:id/edit" opens up the edit form with the data of the seleted invoice pre-populated



# Form Implementation
* The add new invoice and edit invoice features both made use of the same "reusable-invoice-form". 

* Depending on the route, the form either prepopulates its input fields for editing or leaves them
blank for adding a new invoice.

* The reusable form is a reactive form and handles all form building logic within it's component. 

* The "FormControl, FormBuilder, FormArray" and other reactive form APIs were used to build the form elements.

* The form enforces validation before it is submitted. For example all fields are required and e-mails
must match the accepted pattern for e-mails, "user@provider.com"




# Git Workflow
* Two branches were created for this project. The "main" branch holds deployable code and is the reference
branch for live updates

* The development branch, used to implement features, and try them out for correctness before pushing them
to the main branch for deployment.




