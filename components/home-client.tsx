"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './modal';
import { Movie } from '@/types';

const HomepClient = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const fetchMovies = async (query?: string) => {
        try {
            const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
            const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query || 'popular'}`);
            setMovies(response.data.Search || []);
        } catch (error) {
            console.error('Failed to fetch movies:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchMovies(searchTerm);
    };


    return (
        <div className="p-6">
            <form onSubmit={handleSearch} className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search for a movie"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none"
                />
                <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-r-md hover:bg-teal-600">
                    Search
                </button>
            </form>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {movies.map((movie) => (
                    <div
                        key={movie.imdbID}
                        className="cursor-pointer p-4 flex flex-col justify-between gap-y-4 rounded-lg bg-white shadow-md"
                        onClick={() => setSelectedMovie(movie)}
                    >
                        <h3 className="text-lg font-semibold">{movie.Title}</h3>
                        <p className="text-gray-500">{movie.Year}</p>
                    </div>
                ))}
            </div>
            {selectedMovie && (
                <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
            )}
        </div>
    );
};

export default HomepClient;
