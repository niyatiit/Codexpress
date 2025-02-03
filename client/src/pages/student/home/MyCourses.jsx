import React from 'react';
import { Grid, Card, CardContent, Button, Typography, Select, MenuItem, InputLabel, FormControl, Avatar } from '@mui/material';
import { PhLayout, PhFunnelSimple, PhVideoCamera, PhClock } from 'react-icons/ph';  // Assuming you are using react-icons for icons

const MyCourses = ({ courses }) => {
  return (
    <div style={{ marginTop: '24px' }}>
      <Card>
        <CardContent>
          {/* Title and Filter Section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <Typography variant="h4" style={{ marginBottom: '0' }}>
              Recommended For You
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <FormControl variant="outlined" style={{ minWidth: 120 }}>
                <InputLabel>Category</InputLabel>
                <Select label="Category" defaultValue="">
                  <MenuItem value="Web">Web</MenuItem>+
                  <MenuItem value="Design">Design</MenuItem>
                  <MenuItem value="App">App</MenuItem>
                  <MenuItem value="SEO">SEO</MenuItem>
                </Select>
              </FormControl>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Typography variant="body2" color="textSecondary">Sort by: </Typography>
                <FormControl variant="outlined" style={{ minWidth: 120 }}>
                  <InputLabel>Sort by</InputLabel>
                  <Select label="Sort by" defaultValue="Popular">
                    <MenuItem value="Popular">Popular</MenuItem>
                    <MenuItem value="Latest">Latest</MenuItem>
                    <MenuItem value="Trending">Trending</MenuItem>
                    <MenuItem value="Matches">Matches</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>

          {/* Courses List */}
          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Card variant="outlined">
                  <CardContent>
                    <a href={`/course-details/${course.id}`} style={{ display: 'block', textAlign: 'center', marginBottom: '8px' }}>
                      <img src={course.image} alt={course.name} style={{ width: '100%', height: '164px', objectFit: 'cover', borderRadius: '8px' }} />
                    </a>
                    <Typography variant="body2" style={{ backgroundColor: '#e1f5e1', padding: '2px 10px', borderRadius: '20px', color: '#388e3c', marginBottom: '16px' }}>
                      {course.category}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      <a href={`/course-details/${course.id}`} style={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: '#3f51b5' } }}>
                        {course.name}
                      </a>
                    </Typography>

                    {/* Instructor Section */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Avatar alt={course.instructor.name} src={course.instructor.image} style={{ width: '28px', height: '28px' }} />
                      <Typography variant="body2" color="textSecondary">
                        Created by <a href={`/profile/${course.instructor.id}`} style={{ fontWeight: '600', color: '#3f51b5', textDecoration: 'underline' }}>
                          {course.instructor.name}
                        </a>
                      </Typography>
                    </div>

                    {/* Course Details */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f1f1f1' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <PhVideoCamera style={{ color: '#3f51b5' }} />
                        <Typography variant="body2" color="textSecondary">{course.lessons} Lessons</Typography>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <PhClock style={{ color: '#3f51b5' }} />
                        <Typography variant="body2" color="textSecondary">{course.hours} Hours</Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyCourses;
