# Dynamic Section Master API Documentation

## Base URL

```
https://api.example.com/v1/section-master
```

---

# Overview

The Section Master API allows administrators to create dynamic portfolio sections.

The admin defines:

- Section name
- Section type
- Dynamic fields
- Validation rules
- UI settings

The frontend uses this configuration to generate forms dynamically.

---

# Admin APIs

---

# 1. Create Section

Creates a new dynamic section.

## Endpoint

```
POST /section-master/create
```

## Request Body

```json
{
    "name": "Skills",

    "type": "skills",

    "description": "Technical skills section",

    "icon": "skills.png",


    "fields": [

        {
            "key": "title",

            "label": "Section Title",

            "type": "text",

            "required": true
        },


        {
            "key": "description",

            "label": "Description",

            "type": "textarea",

            "required": false
        },


        {
            "key": "skills",

            "label": "Skills",

            "type": "repeatable",

            "required": true,


            "children": [

                {
                    "key": "name",

                    "label": "Skill Name",

                    "type": "text",

                    "required": true
                },


                {
                    "key": "level",

                    "label": "Skill Level",

                    "type": "number",

                    "required": false
                }

            ]

        }

    ],


    "settings": {

        "sortable": true,

        "multiple": true,

        "removable": true

    }
}
```

## Response

```json
{
    "status": true,

    "message": "Section created successfully",

    "id": "66123456789abcdef"
}
```

---

# 2. Update Section

Updates an existing section configuration.

## Endpoint

```
POST /section-master/update
```

## Request Body

```json
{
    "section_id": "66123456789abcdef",

    "name": "Technical Skills",

    "description": "Updated skills section",


    "fields": [

        {
            "key": "title",

            "label": "Title",

            "type": "text",

            "required": true
        },


        {
            "key": "skills",

            "label": "Skills",

            "type": "repeatable",

            "required": true
        }

    ],


    "settings": {

        "sortable": true

    }
}
```

## Response

```json
{
    "status": true,

    "message": "Section updated successfully"
}
```

---

# 3. List Available Sections

Used by users while creating portfolios.

## Endpoint

```
POST /section-master/list
```

## Request Body

```json
{
    "status": 1
}
```

## Response

```json
{
    "status": true,

    "data": [

        {
            "_id": "66123456789abcdef",

            "name": "Skills",

            "type": "skills",

            "description": "Technical skills section",


            "fields": [

                {
                    "key": "title",

                    "label": "Section Title",

                    "type": "text",

                    "required": true
                },


                {
                    "key": "skills",

                    "label": "Skills",

                    "type": "repeatable",

                    "required": true
                }

            ],


            "settings": {

                "sortable": true,

                "multiple": true,

                "removable": true

            }

        }

    ]
}
```

---

# 4. Get Section Details

Returns complete section schema.

## Endpoint

```
GET /section-master/details/{section_id}
```

## Example

```
GET /section-master/details/66123456789abcdef
```

## Response

```json
{
    "status": true,

    "data": {

        "_id": "66123456789abcdef",

        "name": "Skills",

        "type": "skills",

        "description": "Technical skills section",


        "fields": [

            {

                "key": "title",

                "label": "Title",

                "type": "text"

            },

            {

                "key": "skills",

                "label": "Skills",

                "type": "repeatable"

            }

        ]

    }
}
```

---

# 5. Remove Section

Soft deletes a section.

## Endpoint

```
DELETE /section-master/remove/{section_id}
```

## Example

```
DELETE /section-master/remove/66123456789abcdef
```

## Response

```json
{
    "status": true,

    "message": "Section removed"
}
```

---

# Supported Field Types

| Type | Description |
|---|---|
| text | Single line text |
| textarea | Multi-line text |
| number | Numeric value |
| image | Image upload |
| file | File upload |
| select | Dropdown |
| checkbox | Boolean value |
| date | Date picker |
| repeatable | Dynamic array fields |

---

# Field Configuration Structure

Example:

```json
{
    "key": "company",

    "label": "Company Name",

    "type": "text",

    "required": true,

    "validation": {

        "max_length":100

    }
}
```

---

# Repeatable Field Example

For arrays like:

- Skills
- Projects
- Experience
- Testimonials


Configuration:

```json
{
    "key":"projects",

    "label":"Projects",

    "type":"repeatable",

    "children":[

        {
            "key":"title",

            "type":"text"
        },


        {
            "key":"description",

            "type":"textarea"
        },


        {
            "key":"image",

            "type":"image"
        }

    ]
}
```

---

# User Portfolio Flow

```
Admin Creates Section
        |
        |
Admin Defines Fields
        |
        |
Section Available
        |
        |
User Selects Section
        |
        |
Frontend Generates Form
        |
        |
User Enters Data
        |
        |
Save Section Data
        |
        |
Display Portfolio
```

---

# Portfolio Stored Section Example

```json
{
    "section_id":"66123456789abcdef",

    "type":"skills",

    "order":2,

    "visible":true,


    "data":{

        "title":"My Skills",


        "skills":[

            {
                "name":"React",

                "level":90
            },


            {
                "name":"Node.js",

                "level":85
            }

        ]

    }
}
```

---

# Example Sections Created By Admin

## Hero

Fields:

```
title
subtitle
profile_image
buttons
```

---

## Projects

Fields:

```
project_title
description
image
live_url
github_url
technologies
```

---

## Experience

Fields:

```
company
role
start_date
end_date
description
```

---

## Testimonials

Fields:

```
client_name
company
message
image
```

---

# Benefits

- No backend changes for new sections
- Admin controlled portfolio builder
- Dynamic frontend rendering
- Supports future templates
- Supports multiple portfolio types
- Suitable for SaaS portfolio builder