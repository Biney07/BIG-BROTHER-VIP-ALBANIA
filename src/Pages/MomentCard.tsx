import React, { useState } from 'react';
import { PlayArrow, Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import './Momentet.css';
import axios from 'axios';
import YouTube from 'react-youtube';
import "../Momentet/Momentet.css"
interface MomentCardProps {
    moment: {
        id: number;
        title: string;
        date: string;
        description: string;
        videoURL: string;
        viewCount: number;
    };
    isAdmin?: boolean;
}

const MomentCard: React.FC<MomentCardProps> = ({ moment, isAdmin }) => {
    const [videoUrl, setVideoUrl] = useState<string>();
    const [showControls, setShowControls] = useState(false);

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


    const handlePlayArrowClick = (momentId: number) => {
        axios
            .put(`https://localhost:7226/api/Moments/moments/viewcount?id=${momentId}`)
            .then((response) => {
                console.log('PUT request successful:', response.data);
            })
            .catch((error) => {
                console.error('Error sending PUT request:', error);
            });
    };

    const opts = {
        height: '500',
        width: '700',
        playerVars: {
            autoplay: 1,
            controls: showControls ? 1 : 0,
        },
    };

    return (
        <div >

            <div className="momentcard">
                <div
                    onClick={() => handlePlayVideo(moment.videoURL)}
                    style={{ position: 'relative', cursor: 'pointer' }}
                >
                   
                    <img
                        src={`https://img.youtube.com/vi/${moment.videoURL.split('v=')[1]}/mqdefault.jpg`}
                        className="card-img-top"
                        alt={moment.title}
                        style={{ width: '100%' }}
                    />

                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <IconButton onClick={() => handlePlayArrowClick(moment.id)}>
                            <PlayArrow style={{ fontSize: 80, color: '#fff', textShadow: '2px 2px #000' }} />
                        </IconButton>
                    </div>
                </div>
                <div className="card-body">
                    <h5 style={{ color: 'cadetblue' }} className="card-title">
                        {moment.title}
                    </h5>
                    <p className="card-text">{moment.description}</p>
                    <p className="card-text">
                        <small className="text-muted">
                            {new Date(moment.date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'numeric',
                                year: 'numeric',
                            })}
                        </small>
                    </p>
                    {isAdmin && <h6>{moment.viewCount} Views</h6>}
                </div>
            </div>
            {videoUrl && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        zIndex: 999,
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            width: '700px',
                            height: '500px',
                            top: '20%',
                            left: '30%',
                            overflow: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <div>
                            <YouTube videoId={videoUrl.split('v=')[1]} onEnd={handleVideoEnd} opts={opts} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }} />
                        </div>
                    </div>
                    <IconButton
                        aria-label="close video"
                        className="text-white"
                        style={{
                            fontSize: 32,
                            position: 'absolute',
                            top: 100,
                            right: '25%',
                            margin: 16,
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                            zIndex: 1000,
                            transform: 'translate(50%, -50%)',
                        }}
                        onClick={handleVideoEnd}
                    >
                        <Close />
                    </IconButton>
                </div>
            )}
        </div>

    );
};

export default MomentCard;
