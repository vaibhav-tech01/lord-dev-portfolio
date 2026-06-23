import React, { useState, useEffect, useRef } from 'react';
import {
    Star,
    Quote,
    ChevronLeft,
    ChevronRight,
    X,
    Calendar,
    MapPin,
    Pause,
    Play,
    MessageSquare
} from 'lucide-react';
import { db } from "../firebase";

import {
    addDoc,
    collection,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
} from "firebase/firestore";

import { STATIC_REVIEW_IMAGES } from "../data/review";

const ClientReviewSection = () => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        name: '',
        country: '',
        rating: 5,
        comment: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const scrollContainerRef = useRef(null);
    const sectionRef = useRef(null);
    const animationRef = useRef(null);

    const normalizeNameToKey = (name = "") => {
    return name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "")       // remove spaces
        .replace(/[^a-z]/g, "");   // remove symbols
    };

    const getReviewImages = (review) => {
    //Future: Firebase-uploaded images
    if (Array.isArray(review.images) && review.images.length > 0) {
        return review.images;
    }

    //Derive imageKey from name
    const derivedKey = normalizeNameToKey(review.name);
    if (STATIC_REVIEW_IMAGES[derivedKey]) {
        return STATIC_REVIEW_IMAGES[derivedKey];
    }

    //No images (new reviews)
    return [];
    };


    // Sample reviews data
    const fetchReviews = async () => {
    try {
        const q = query(
        collection(db, "reviews"),
        orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => {
        const review = doc.data();
        return {
            id: doc.id,
            ...review,
            createdAt: review.createdAt?.toDate
            ? review.createdAt.toDate()
            : new Date(),
            images: review.images || [] // safe fallback
        };
        });

        setReviews(data);
    } catch (err) {
        console.error("Error fetching reviews:", err);
        setReviews([]);
    }
    };


    useEffect(() => {
        fetchReviews();
    }, []);


    // Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Infinite Auto-scroll animation
    useEffect(() => {
        if (!isAutoPlaying || !scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        let scrollPosition = 0;
        const scrollSpeed = 0.5;

        const animate = () => {
            scrollPosition += scrollSpeed;
            
            if (scrollPosition >= container.scrollWidth / 2) {
                scrollPosition = 0;
            }
            
            container.scrollLeft = scrollPosition;
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isAutoPlaying]);

    const toggleAutoPlay = () => {
        setIsAutoPlaying(!isAutoPlaying);
    };

    const handleSubmit = async () => {
  if (!newReview.name || !newReview.country || !newReview.comment) {
    setMessage("Please fill all fields");
    setTimeout(() => setMessage(""), 3000);
    return;
  }

  setIsSubmitting(true);
  setMessage("");

  try {
    await addDoc(collection(db, "reviews"), {
      name: newReview.name,
      country: newReview.country,
      rating: newReview.rating,
      comment: newReview.comment,
      images: [], // future-proof (can add upload later)
      createdAt: serverTimestamp()
    });

    setMessage("Review submitted successfully!");
    setNewReview({ name: "", country: "", rating: 5, comment: "" });

    fetchReviews(); // 🔥 refresh from Firestore

    setTimeout(() => setMessage(""), 3000);
  } catch (err) {
    console.error("Error submitting review:", err);
    setMessage("Failed to submit review");
    setTimeout(() => setMessage(""), 3000);
  } finally {
    setIsSubmitting(false);
  }
};


    // Lightbox functions
    const openLightbox = (images, startIndex) => {
        setLightboxImages(images);
        setLightboxIndex(startIndex);
        setLightboxOpen(true);
    };

    const nextLightboxImage = () => {
        setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
    };

    const prevLightboxImage = () => {
        setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
    };

    // Image Carousel Component with Auto-scroll
            const ImageCarousel = ({ images }) => {
        const [currentSlide, setCurrentSlide] = useState(0);
        const [isImageAutoPlay, setIsImageAutoPlay] = useState(true);

        useEffect(() => {
            if (images.length > 1 && isImageAutoPlay) {
                const interval = setInterval(() => {
                    setCurrentSlide((prev) => (prev + 1) % images.length);
                }, 3000);
                return () => clearInterval(interval);
            }
        }, [images.length, isImageAutoPlay]);

        if (!images || images.length === 0) {
            return (
                <div className="h-28 sm:h-32 bg-gradient-to-br from-surface2 via-surface to-surface2 flex items-center justify-center">
                    <MessageSquare className="text-muted/50 w-6 h-6 sm:w-8 sm:h-8" />
                </div>
            );
        }

        return (
            <div className="relative h-28 sm:h-32 w-full overflow-hidden group">
                <div className="relative h-full">
                    {images.map((image, idx) => (
                        <div
                            key={idx}
                            className={`absolute inset-0 transition-opacity duration-700 ${
                                idx === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <img
                                src={image}
                                alt={`Slide ${idx + 1}`}
                                onClick={() => openLightbox(images, idx)}
                                className="w-full h-full object-cover cursor-pointer transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    ))}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-base/70 via-base/10 to-transparent pointer-events-none" />

                {images.length > 1 && (
                    <>
                        {/* Dots Indicator */}
                        <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentSlide(idx);
                                        setIsImageAutoPlay(false);
                                    }}
                                    className={`transition-all rounded-full ${
                                        idx === currentSlide
                                            ? 'bg-ink w-4 h-1'
                                            : 'bg-white/40 hover:bg-white/60 w-1 h-1'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Counter */}
                        <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 bg-base/60 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full text-ink text-[8px] sm:text-[9px] font-bold z-10">
                            {currentSlide + 1}/{images.length}
                        </div>
                    </>
                )}
            </div>
        );
    };

    // Duplicate reviews for seamless infinite scroll
    const duplicatedReviews = [...reviews, ...reviews];

    return (
        <section
            ref={sectionRef}
            id="reviews"
            className="relative py-20 sm:py-28 px-4 overflow-hidden bg-base border-t border-line"
        >
            {/* Premium Background */}
            <div className="absolute inset-0 bg-transparent" />
            <div className="absolute top-1/4 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}} />
            <div className="absolute bottom-1/4 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-accent2/5 rounded-full blur-3xl animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}} />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Premium Header */}
                <div
                    className={`text-center mb-8 sm:mb-10 md:mb-12 transition-all duration-1000 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    <div className="relative inline-block mb-4 sm:mb-6">
                        <div className="flex justify-center items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-ink tracking-tight">
                                Client Reviews
                            </h3>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-line to-transparent rounded-full" />
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-muted max-w-2xl mx-auto font-light tracking-wide">
                        Discover why clients trust and recommend my services worldwide
                    </p>
                </div>

                {/* Infinite Scroll Container */}
                <div className="relative -mx-4 sm:mx-0 mb-8 sm:mb-12">
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 sm:gap-6 overflow-x-hidden scrollbar-hide py-2"
                        style={{ scrollBehavior: 'auto' }}
                    >
                        {duplicatedReviews.map((review, idx) => (
                            <div
                                key={`${review.id}-${idx}`}
                                className="flex-shrink-0 w-[240px] sm:w-[260px] md:w-[280px]"
                            >
                                <div className="group relative h-full">
                                    {/* Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl rounded-2xl" />
                                    
                                    <div className="relative h-full bg-surface backdrop-blur-xl rounded-xl border border-line group-hover:border-accent/40 shadow-2xl shadow-sm group-hover:shadow-none transition-all duration-700 overflow-hidden group-hover:scale-[1.02]">
                                        
                                        {/* Image Carousel */}
                                        <ImageCarousel images={getReviewImages(review)} />

                                        {/* Content */}
                                        <div className="p-3 sm:p-4">
                                            {/* Rating */}
                                            <div className="flex gap-0.5 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                                                            i < review.rating
                                                                ? 'text-amber-400 fill-amber-400'
                                                                : 'text-muted/50'
                                                        }`}
                                                    />
                                                ))}
                                            </div>

                                            {/* Quote Icon */}
                                            <Quote className="text-muted/30 mb-1.5 w-5 h-5 sm:w-6 sm:h-6" />

                                            {/* Comment */}
                                            <p className="text-ink/90 text-[11px] sm:text-xs leading-relaxed mb-3 line-clamp-3 font-light tracking-wide">
                                                "{review.comment}"
                                            </p>

                                            {/* Author Info */}
                                            <div className="flex items-center gap-2 sm:gap-2.5 pt-3 border-t border-line">
                                                <div className="relative flex-shrink-0">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent rounded-full blur-md opacity-40" />
                                                    <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-accent to-accent flex items-center justify-center text-white font-black text-xs sm:text-sm shadow-lg">
                                                        {review.name.charAt(0).toUpperCase()}
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-ink font-bold text-xs sm:text-sm truncate">
                                                        {review.name}
                                                    </h4>
                                                    <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-muted">
                                                        <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                                                        <span className="truncate">{review.country}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[8px] sm:text-[9px] text-muted/70 mt-0.5">
                                                        <Calendar className="w-2 h-2 flex-shrink-0" />
                                                        <span>
                                                            {review.createdAt?.toLocaleDateString('en-GB', {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Fade Edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
                </div>

                {/* Control Panel */}
                <div className="flex justify-center items-center gap-4 mb-10 sm:mb-12">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-accent2 animate-pulse' : 'bg-line'}`} />
                        <span className="text-xs sm:text-sm text-muted font-light tracking-wide">
                            {isAutoPlaying ? 'Auto-scrolling' : 'Paused'}
                        </span>
                    </div>

                    <button
                        onClick={toggleAutoPlay}
                        className="group relative"
                        aria-label={isAutoPlaying ? "Pause" : "Play"}
                    >
                        <div className="absolute inset-0 bg-accent/15 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-surface backdrop-blur-xl border border-line group-hover:border-accent/40 rounded-full p-2.5 sm:p-3 shadow-xl transition-all duration-500 group-hover:scale-110">
                            {isAutoPlaying ? (
                                <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-muted group-hover:text-ink transition-colors duration-300" />
                            ) : (
                                <Play className="w-4 h-4 sm:w-5 sm:h-5 text-muted group-hover:text-ink transition-colors duration-300 ml-0.5" />
                            )}
                        </div>
                    </button>
                </div>

                {/* Submit Review Form — redesigned to match the Contact section style */}
                <div className="max-w-2xl mx-auto">
                    <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
                        <div className="mb-6">
                            <p className="eyebrow mb-2">● Share Your Experience</p>
                            <h3 className="text-xl sm:text-2xl font-display font-semibold text-ink">
                                Worked with me? Leave a review
                            </h3>
                            <p className="text-sm text-muted mt-1.5">
                                Your feedback helps other clients know what to expect.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-muted mb-1.5">Name *</label>
                                    <input
                                        type="text"
                                        value={newReview.name}
                                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                        className="w-full bg-surface2 border border-line rounded-lg py-2.5 px-3.5 text-sm text-ink placeholder-muted/60 focus:outline-none focus:border-accent/50 transition-colors duration-200"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-muted mb-1.5">Country *</label>
                                    <input
                                        type="text"
                                        value={newReview.country}
                                        onChange={(e) => setNewReview({ ...newReview, country: e.target.value })}
                                        className="w-full bg-surface2 border border-line rounded-lg py-2.5 px-3.5 text-sm text-ink placeholder-muted/60 focus:outline-none focus:border-accent/50 transition-colors duration-200"
                                        placeholder="United States"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-muted mb-1.5">Rating</label>
                                <div className="flex items-center gap-1.5 bg-surface2 border border-line rounded-lg py-2.5 px-3.5 w-fit">
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <button
                                            key={rating}
                                            type="button"
                                            onClick={() => setNewReview({ ...newReview, rating })}
                                            className="transition-transform duration-150 hover:scale-110"
                                        >
                                            <Star
                                                className={`w-5 h-5 ${
                                                    rating <= newReview.rating
                                                        ? 'text-amber-400 fill-amber-400'
                                                        : 'text-line'
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-muted mb-1.5">Comment *</label>
                                <textarea
                                    value={newReview.comment}
                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                    rows="4"
                                    className="w-full bg-surface2 border border-line rounded-lg py-2.5 px-3.5 text-sm text-ink placeholder-muted/60 focus:outline-none focus:border-accent/50 transition-colors duration-200 resize-none"
                                    placeholder="Share your experience working with me..."
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                                </button>

                                {message && (
                                    <p className={`text-sm font-medium ${
                                        message.includes('successfully') ? 'text-accent2' : 'text-red-400'
                                    }`}>
                                        {message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 bg-base/95 z-50 flex items-center justify-center p-4"
                    onClick={() => setLightboxOpen(false)}
                >
                    <button
                        onClick={() => setLightboxOpen(false)}
                        className="absolute top-4 sm:top-6 right-4 sm:right-6 text-ink hover:text-ink/90 transition-colors z-10 bg-base/50 p-2.5 sm:p-3 rounded-full hover:bg-base/70"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={lightboxImages[lightboxIndex]}
                            alt="Review"
                            className="w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                        />

                        {lightboxImages.length > 1 && (
                            <>
                                <button
                                    onClick={prevLightboxImage}
                                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-base/70 hover:bg-surface2 text-ink p-3 sm:p-4 rounded-full transition-all backdrop-blur-sm"
                                >
                                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                                <button
                                    onClick={nextLightboxImage}
                                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-base/70 hover:bg-surface2 text-ink p-3 sm:p-4 rounded-full transition-all backdrop-blur-sm"
                                >
                                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>

                                <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-base/70 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full text-ink font-bold text-sm sm:text-base">
                                    {lightboxIndex + 1} / {lightboxImages.length}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
};

export default ClientReviewSection;
