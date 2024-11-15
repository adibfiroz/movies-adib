"use client"


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Movie, MovieDetails } from '@/types';
import { X } from 'lucide-react';

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

const Modal = ({ movie, onClose }: MovieModalProps) => {
    const [details, setDetails] = useState<MovieDetails | null>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
                const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`);
                setDetails(response.data);
            } catch (error) {
                console.error('Failed to fetch movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [movie]);

    if (!details) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full relative">
                <div className='grid md:grid-cols-2 gap-5'>
                    <img src={details.Poster} alt="" className='max-h-[200px] md:max-h-[60vh] mx-auto' />

                    <div>
                        <button onClick={onClose} className="absolute text-lg top-2 right-2 text-gray-600 hover:text-gray-900">
                            <X />
                        </button>
                        <h2 className="text-2xl font-semibold mb-2">{details.Title}</h2>
                        <p className="mb-2"><strong>Year:</strong> {details.Year}</p>
                        <p className="mb-2"><strong>Genre:</strong> {details.Genre}</p>
                        <p className="mb-2"><strong>Plot:</strong> {details.Plot}</p>
                        <p className="mb-2"><strong>Rating:</strong> {details.imdbRating}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
