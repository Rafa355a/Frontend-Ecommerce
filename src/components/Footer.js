// src/components/Footer.js

import React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              InnovaTec
            </Typography>
            <Typography variant="body2" color="text.secondary">
              © 2024 InnovaTec. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link href="https://www.facebook.com" color="inherit" sx={{ mx: 1 }}>
              <FacebookIcon />
            </Link>
            <Link href="https://www.twitter.com" color="inherit" sx={{ mx: 1 }}>
              <TwitterIcon />
            </Link>
            <Link href="https://www.instagram.com" color="inherit" sx={{ mx: 1 }}>
              <InstagramIcon />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
