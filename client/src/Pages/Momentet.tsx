import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import { ChevronLeft, ChevronRight, Close, Favorite, PlayArrow, Search } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, TextField, ThemeProvider, Typography } from '@mui/material';
import swal from 'sweetalert';
import { createTheme } from '@mui/material/styles';
import './Momentet.css';

import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
// import Footer from '../Components/Footer/Footer';



interface Moment {
    id: number;
    title: string;
    date: string;
    description: string;
    videoURL: string;
    viewCount: number;
}
const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#FFD700	',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});
function Momentet() {

    const [moments, setMoments] = useState<Moment[]>([]);
    const [videoURL, setVideoUrl] = useState<string | undefined>(undefined);
    const [showControls, setShowControls] = useState(false);
    const userString = localStorage.getItem('user');
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [likedMoments, setLikedMoments] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

    const handleDateChange = (newDate: any) => {
        setSelectedDate(newDate);
    };

    const handleQueryChange = (event: any) => {
        setSearchQuery(event.target.value);
    };





    useEffect(() => {
        axios.get<Moment[]>(`https://localhost:7226/api/Moments?page=${page}&search=${searchQuery}`)
            .then(response => {
                setMoments(response.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [page, searchQuery]);


    const handlePlayVideo = (videoURL: string) => {
        setVideoUrl(videoURL);

        setShowControls(true); // add this line to show the controls
    };

    const handleVideoEnd = () => {
        setVideoUrl(undefined);
    };

    const handleToggleControls = () => {
        setShowControls(!showControls);

    };
    function handlePlayArrowClick(momentId: number) {

        axios.put(`https://localhost:7226/api/Moments/moments/viewcount?id=${momentId}`)
            .then(response => {
                console.log('PUT request successful:', response.data);
            })
            .catch(error => {
                console.error('Error sending PUT request:', error);
            });
    }




    const handleLikeButtonClick = async (momentId: number) => {
        if (likedMoments === momentId) {
            setLikedMoments(null);
        } else {
            setLikedMoments(momentId);
            try {
                const user = JSON.parse(localStorage.getItem("user")!);
                const userId = user.id;
                const response = await axios.post("https://localhost:7226/api/Favorites", { userId, momentId },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json'
                        }
                    });
                swal("Momenti u shtua tek te preferuarat!", {
                    icon: "success",
                });
            } catch (error: any) {
                console.log("Error adding favorite:", error.message);
                swal("Gabim gjate shtimit tek te preferuarat", {
                    icon: "error",
                });
            }
        }
    };
    const handlePrevPage = () => {
        setPage(page - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNextPage = () => {
        setPage(page + 1);
        window.scrollTo(0, 0);
    };



    return (
        <ThemeProvider theme={theme}>
            <div className="titleMomentet">
                <p >Momentet</p>
            </div>

            <div className="momentinput">

                <TextField
                    label="Search by Title"
                    variant="outlined"
                    value={searchQuery}
                    focused
                    onChange={handleQueryChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search style={{ color: theme.palette.primary.main }} />
                            </InputAdornment>

                        ),
                        style: { color: theme.palette.primary.main } // Apply the primary color from the theme
                    }}
                    style={{ marginRight: 16 }}
                />


                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker
                        label="Search by Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        autoFocus

                    />

                </LocalizationProvider>
            </div>

            <div className="row" style={{ margin: '0px 30px' }}>
                {moments
                    .filter(moment => moment.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                        (selectedDate === null || moment.date.includes(selectedDate.format('YYYY-MM-DD'))))
                    .slice((page - 1) * 9, page * 9)
                    .map(moment => (

                        <div key={moment.id} className="momentcard">
                            <div onClick={() => handlePlayVideo(moment.videoURL)} style={{ position: 'relative', cursor: 'pointer' }} className="imagetoptop">
                                <img src={`https://img.youtube.com/vi/${moment.videoURL.split('v=')[1]}/mqdefault.jpg`} className="card-img-top" alt={moment.title} style={{ width: '100%' }} />
                                <p style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    padding: '4px 8px',
                                    margin: 0,
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    opacity: 0.8,
                                    zIndex: 1,
                                }}>
                                    {moment.viewCount}  Views
                                </p>
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                    <PlayArrow style={{ fontSize: 80, color: '#fff', textShadow: '2px 2px #000' }} onClick={() => handlePlayArrowClick(moment.id)} />
                                </div>
                            </div>
                            <div className="cardbody">
                                <h5 style={{ color: 'black' }} className="card-title">{moment.title}</h5>
                                <p className="card-text">{moment.description}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p className="card-text">
                                        <small className="text-muted">{new Date(moment.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</small>
                                    </p>
                                    <IconButton onClick={() => handleLikeButtonClick(moment.id)} aria-label="like">
                                        <Favorite color={likedMoments === moment.id ? 'secondary' : 'action'} />
                                    </IconButton>


                                </div>


                            </div>
                        </div>




                    ))}
                {videoURL && (
                    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: 999 }}>
                        <div style={{ position: "absolute", width: "700px", height: "500px", top: "20%", left: "30%", overflow: "hidden", display: "flex", justifyContent: "center" }}>
                            <div style={{ position: "absolute", margin: '50vh', top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                                <IconButton aria-label="play video" className="text-white" style={{ fontSize: 64, boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }} onClick={handleToggleControls}>
                                    <PlayArrow />
                                </IconButton>
                                <div >

                                </div>
                            </div>

                            {videoURL && (
                                <YouTube videoId={videoURL.split('v=')[1]} onEnd={handleVideoEnd} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }} />
                            )}
                        </div>
                        <IconButton
                            aria-label="close video"
                            className="text-white"
                            style={{
                                color: 'white',
                                fontSize: 32,
                                position: "absolute",
                                top: 100,
                                right: "25%",
                                margin: 16,
                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                                zIndex: 1000, // add a higher z-index value
                                transform: "translate(50%, -50%)" // move the button to the right side
                            }}
                            onClick={handleVideoEnd}
                        >
                            <Close />
                        </IconButton>
                    </div>

                )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0px -30px 0px' }}>
                <IconButton
                    color="secondary"
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    style={{ backgroundColor: 'gold', color: 'black', borderRadius: '100%' }}
                >
                    <ChevronLeft />
                </IconButton>

                <Typography style={{ margin: '0px 20px', fontSize: '16px', color:'gold' }}>
                    Page {page}
                </Typography>

                <IconButton
                    color="secondary"
                    onClick={handleNextPage}
                    style={{ backgroundColor: 'gold', color: 'black', borderRadius: '100%' }}
                >
                    <ChevronRight />
                </IconButton>
            </div>
        </ThemeProvider>
        
    );
}

export default Momentet;
