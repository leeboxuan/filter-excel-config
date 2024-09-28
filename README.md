# Filter Rule Configuration System

## Overview

The Filter Rule Configuration System is an Angular-based application that allows users to upload Excel files and define filter rules for filtering records based on various criteria. The system handles complex rule structures and provides an intuitive interface for managing rules, allowing users to create, modify, and delete rules as needed.

## Features

- **Excel File Upload**: Users can upload `.xlsx` or `.xls` files to import data.
- **Dynamic Filtering**: Users can create and apply filter rules based on uploaded data.
- **User-Friendly Interface**
- **Responsive Design**

## Project Structure

/src
├── app
│ ├── components # Folder containing reusable components
│ │ ├── rule-configuration # Parent component for the upload form
│ │ │ ├── rule-configuration.component.ts
│ │ │ ├── rule-configuration.component.html
│ │ │ ├── rule-configuration.component.scss
│ │ ├── upload # Main upload and filter processing
│ │ │ ├── upload.component.ts
│ │ │ ├── upload.component.html
│ │ │ ├── upload.component.scss
