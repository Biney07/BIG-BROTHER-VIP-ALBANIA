import { Box, Container, Link, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PrintIcon from '@mui/icons-material/Print';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React from 'react';
import './Footer.css';
const links = [
    {
        title: 'Links',
        links: [
            { name: 'Home', route: '/' },
            { name: 'Votat', route: '/Order' },
            { name: 'Votat', route: '/Catalog' },
            { name: 'Dancers', route: '/Banoret' },
        ],
    },
    {
        title: 'Links',
        links: [
            { name: 'Prime', route: '/Primes' },
            { name: 'Fan Page', route: '/Posts' },
            { name: 'Momentet', route: '/Momentet' },
            { name: 'Games', route: '/Games' },
        ],
    },
];

export default function Footer()  {
    return (<>
        <Box component="footer" sx={{ bgcolor: 'gold', py: 6 , marginTop:'80px'}}>
            <Container maxWidth="xl" style={{ padding: '0px 70px ' }}>
                <div className="topfoot">
                    <div className="footer-top-row">
                        <div className="footer-social-text">
                            <Typography variant="body2" color="text.secondary" align="right">
                                Get connected with us on social networks:
                            </Typography>
                        </div>
                        <div className="footer-social-icons">
                            <Link
                                href="https://www.instagram.com/bigbrothervipkosova/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-icon-link"
                            >
                                <InstagramIcon className="footer-social-icon" />
                            </Link>
                            <Link
                                href="https://www.facebook.com/bigbrothervipkosova"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-icon-link"
                            >
                                <FacebookIcon className="footer-social-icon" />
                            </Link>
                            <Link
                                href="https://www.youtube.com/@bigbrothervipkosova"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-icon-link"
                            >
                                <YouTubeIcon className="footer-social-icon" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="footer-middle-row">
                    <div className="footer-middle-item">
                        <Typography variant="h6" color="text.primary" gutterBottom className="footer-middle-heading">
                            <Box sx={{ display: 'flex' }}>Dancing With The Stars</Box>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph className="footer-middle-text">
                            Qëllimi kryesor i DWTS është të shfaqë artin e bukur dhe emocionet permes vallzimit ne nje format televiziv.                        </Typography>
                    </div>
                    {links.map((link, index) => (
                        <div key={index} className="footer-middle-item">
                            <Typography variant="h6" color="text.primary" gutterBottom className="footer-middle-heading">
                                {link.title}
                            </Typography>
                            <ul className="footer-middle-list">
                                {link.links.map((sublink) => (
                                    <li key={sublink.name} className="footer-middle-list-item">
                                        <Link href={sublink.route} variant="subtitle1" color="text.secondary" className="footer-middle-link">
                                            {sublink.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div className="footer-middle-item">

                        <Typography variant="h6" color="text.primary" gutterBottom className="footer-middle-heading">
                            <Box sx={{ display: 'flex' }}>Kontakti</Box>
                        </Typography>

                        <Typography variant="body2" color="text.secondary" paragraph style={{display:'flex', alignItems:'center'}}>
                            <LocationOnIcon className="contact-icon" />

                            Tirane, Albania 1001
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph style={{display:'flex', alignItems:'center'}}>
                            <MailOutlineIcon className="contact-icon" /> dancingwiththestars@gmail.com
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph style={{display:'flex', alignItems:'center'}}>
                            <PhoneIcon className="contact-icon" />  +383 49 100 100
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph style={{display:'flex', alignItems:'center'}}>
                            <PrintIcon className="contact-icon" />  +383 44 100 100
                        </Typography>
                    </div>

                </div>

            </Container>

        </Box>
        <div className="footer-bottom-row">
            <Typography variant="body2"  align="center" className="footer-bottom-text">
                © {new Date().getFullYear()} Dancing With The Stars. All Rights Reserved.
            </Typography>

        </div >
    </>
    );
};
