import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Icon from '@mui/material/Icon';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function AboutTab(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/profile/about').then((res) => {
      setData(res.data);
    });
  }, []);

  if (!data) {
    return null;
  }

  const { general, work, contact, groups, friends } = data;

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <div className="md:flex max-w-2xl">
        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
          <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
            <AppBar position="static" elevation={0}>
              <Toolbar className="px-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1 px-12 font-medium"
                >
                  General Information
                </Typography>
              </Toolbar>
            </AppBar>

            <CardContent>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Gender</Typography>
                <Typography>{props.user.data.gender ? props.user.data.gender : ''}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Birthday</Typography>
                <Typography>
                  {props.user.data.dateOfBirth ? props.user.data.dateOfBirth : ''}
                </Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Locations</Typography>

                {props.user.countries.map((country) => (
                  <div className="flex items-center" key={country.id}>
                    <Typography>{country.name}</Typography>
                    <Icon className="text-16 mx-4" color="action">
                      location_on
                    </Icon>
                  </div>
                ))}
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">About Me</Typography>
                <Typography>{props.user.data.aboutMe ? props.user.data.aboutMe : ''}</Typography>
              </div>
            </CardContent>
          </Card>

          <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
            <AppBar position="static" elevation={0}>
              <Toolbar className="px-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1 px-12 font-medium"
                >
                  Work
                </Typography>
              </Toolbar>
            </AppBar>

            <CardContent>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Occupation</Typography>
                <Typography>
                  {props.user.data.occupation ? props.user.data.occupation : ''}
                </Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Skills</Typography>
                <Typography>{props.user.data.skills ? props.user.data.skills : ''}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Jobs</Typography>
                {props.user.data.jobs &&
                  props.user.data.jobs
                    .split('\n')
                    .map((job, index) => <Typography key={index}>{job}</Typography>)}
              </div>
            </CardContent>
          </Card>

          <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
            <AppBar position="static" elevation={0}>
              <Toolbar className="px-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1 px-12 font-medium"
                >
                  Contact
                </Typography>
              </Toolbar>
            </AppBar>

            <CardContent>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Address</Typography>
                {props.user.data.address &&
                  props.user.data.address
                    .split('\n')
                    .map((address, index) => <Typography key={index}>{address}</Typography>)}
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Tel.</Typography>

                <div className="flex items-center">
                  <Typography>{props.user.data.phoneNumber}</Typography>
                </div>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Website</Typography>

                <div className="flex items-center">
                  <Typography>{props.user.data.website}</Typography>
                </div>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Email</Typography>
                <div className="flex items-center">
                  <Typography>{props.user.email}</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

export default AboutTab;
