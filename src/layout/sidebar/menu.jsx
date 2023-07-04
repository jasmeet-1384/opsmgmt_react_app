import { Home, FileText, Server,  Users, Layers,  Monitor } from 'react-feather'
export const MENUITEMS = [
    {
        menutitle: "General",
        menucontent: "Dashboards",
        Items: [
            {
                title: 'Dashboard', icon: Home, type: 'sub', badge: "badge badge-success", badgetxt: "", active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/dashboard/default`, title: 'Default', type: 'link' },
                    
                ]
            },
           
        ]
    },

    {
        menutitle: "Applications",
        menucontent: "Ready to use Apps",
        Items: [
           
            { path: `${process.env.PUBLIC_URL}/app/kanban-board`, icon: Monitor, badge: "badge badge-info", badgetxt: "", title: 'Kanban Board', type: 'link' },


        ]
    },


    {
        menutitle: "Forms & Reports",
        menucontent: "Ready to use froms",
        Items: [
            {
                title: 'Opsmgnt-Forms', icon: FileText, type: 'sub', menutitle: "Forms & Table", menucontent: "Ready to use froms & tables", active: false, children: [
                  
                            { title: 'Leave Application', type: 'link', path: `${process.env.PUBLIC_URL}/forms/form-validation` },
                            { title: 'Change Management', type: 'link', path: `${process.env.PUBLIC_URL}/forms/baseInput` },
                            { title: 'Appraisal', type: 'link', path: `${process.env.PUBLIC_URL}/forms/radio-checkbox` },
                            { title: 'Project Onboarding', type: 'link', path: `${process.env.PUBLIC_URL}/forms/inputGroup` },
                            { title: 'Time Tracker', type: 'link', path: `${process.env.PUBLIC_URL}/forms/megaOptions` },

                        
                ],
               },
               {
                title: 'Opsmgnt-Reports', icon: Server, type: 'sub', children: [
                    
                            { title: 'Change Management Data', type: 'link', path: `${process.env.PUBLIC_URL}/table/basic` },
                            { title: 'Time Tracker Data', type: 'link', path: `${process.env.PUBLIC_URL}/table/sizing` },
                            { title: 'Project Onboarding Data', type: 'link', path: `${process.env.PUBLIC_URL}/table/border` },
                            { title: 'Appraisal Data', type: 'link', path: `${process.env.PUBLIC_URL}/table/styling` },
                            { title: 'Leave Data', type: 'link', path: `${process.env.PUBLIC_URL}/table/datatable`},
                ]
            },
               
        ]
            
            },
    
    

    {
        menutitle: "Pages",
        menucontent: "All neccesory pages added",
        Items: [
            {
                title: 'Pages', icon: Layers, type: 'sub', badge2: true, active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/pages/samplepage`, title: 'Sample Page', type: 'link' },
                    { path: `${process.env.PUBLIC_URL}/pages/searchpage`, title: 'Search Pages', type: 'link' },

                ]
            }
        ]
    },

    {
        menutitle: "Profile",
        menucontent: "Edit your profile",
        Items: [
            {
                title: 'Users', icon: Users, path: `${process.env.PUBLIC_URL}/app/users/userProfile`, type: 'sub', bookmark: true, active: false, children: [
                    { path: `${process.env.PUBLIC_URL}/app/users/userProfile`, type: 'link', title: 'Users Profile ' },
                    { path: `${process.env.PUBLIC_URL}/app/users/userEdit`, type: 'link', title: 'Users Edit' },
                    { path: `${process.env.PUBLIC_URL}/app/users/userCards`, type: 'link', title: 'Users Cards' },
                ]
            },

        ]
    },

    
]