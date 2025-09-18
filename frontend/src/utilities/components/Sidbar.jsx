import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

export default function Sidbar({ openDrawer, setOpenDrawer }) {

    const sidebarContent = [{
        text: 'Dashoard',
        url: 'dashboard'
    },
    {
        text: 'Starred',
        url: 'dashboard'
    }
        ,
    {
        text: 'Send email',
        url: 'dashboard'
    },
    {
        text: 'Drafts',
        url: 'dashboard'
    },
    ]

    const navigate = useNavigate()
    const toggleDrawer = (newOpen) => () => {
        setOpenDrawer(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {sidebarContent?.map((item, index) => (
                    // console.log(text,'nvckk')
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton onClick={() => navigate(`/${item.url}`)}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>

            <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}