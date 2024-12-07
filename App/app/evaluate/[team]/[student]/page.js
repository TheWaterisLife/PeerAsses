// pages/evaluate/[team]/[student].js
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AnimatedBackground from '@/app/components/home/AnimatedBackground';
import NavBar from '@/app/components/home/Navbar';

NavBar.propTypes = {
  role: PropTypes.string.isRequired,
};

// StarRating Component (Unchanged)
const StarRating = ({
  rating,
  hoverRating,
  setRating,
  setHoverRating,
  isDisabled,
}) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div
          key={star}
          whileHover={{ scale: isDisabled ? 1 : 1.2 }}
          whileTap={{ scale: isDisabled ? 1 : 0.9 }}
          onClick={() => !isDisabled && setRating(star)}
          onMouseEnter={() => !isDisabled && setHoverRating(star)}
          onMouseLeave={() => !isDisabled && setHoverRating(0)}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill={(hoverRating || rating) >= star ? '#FFD700' : 'none'}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={(hoverRating || rating) >= star ? '#FFD700' : '#E5E7EB'}
            className="w-10 h-10 cursor-pointer transition-colors duration-300"
            animate={{
              rotate: (hoverRating || rating) >= star ? [0, -10, 10, 0] : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.951a1 1 0 00.95.69h4.161c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.951c.3.921-.755 1.688-1.538 1.118l-3.37-2.447a1 1 0 00-1.175 0l-3.37 2.447c-.783.57-1.838-.197-1.538-1.118l1.287-3.951a1 1 0 00-.364-1.118L2.663 9.378c-.783-.57-.38-1.81.588-1.81h4.161a1 1 0 00.95-.69l1.286-3.951z"
            />
          </motion.svg>
        </motion.div>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  hoverRating: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
  setHoverRating: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

// EvaluateStudent Component
export default function EvaluateStudent({ params }) {
  const { team, student } = params;
  const { data: session, status } = useSession();
  const router = useRouter();

  const [ratingConceptual, setRatingConceptual] = useState(0);
  const [hoverRatingConceptual, setHoverRatingConceptual] = useState(0);
  const [commentConceptual, setCommentConceptual] = useState('');

  const [ratingPractical, setRatingPractical] = useState(0);
  const [hoverRatingPractical, setHoverRatingPractical] = useState(0);
  const [commentPractical, setCommentPractical] = useState('');

  const [ratingWorkEthic, setRatingWorkEthic] = useState(0);
  const [hoverRatingWorkEthic, setHoverRatingWorkEthic] = useState(0);
  const [commentWorkEthic, setCommentWorkEthic] = useState('');

  const [ratingCooperation, setRatingCooperation] = useState(0);
  const [hoverRatingCooperation, setHoverRatingCooperation] = useState(0);
  const [commentCooperation, setCommentCooperation] = useState('');

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic unchanged
  };

  return (
    <>
      <AnimatedBackground />
      <NavBar role={session?.user?.role || 'student'} />

      <div className="relative container mx-auto px-6 py-16 z-10">
        <Card className="max-w-3xl mx-auto bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-extrabold text-black mb-2">
              Evaluate Team Member
            </CardTitle>
            <CardDescription className="text-xl text-black">
              Provide your evaluation for{' '}
              <span className="text-black font-bold">{student}</span> in the following
              areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-10">
                <label
                  htmlFor="conceptual"
                  className="block text-2xl font-semibold text-black mb-4"
                >
                  Conceptual Contribution
                </label>
                <StarRating
                  rating={ratingConceptual}
                  hoverRating={hoverRatingConceptual}
                  setRating={setRatingConceptual}
                  setHoverRating={setHoverRatingConceptual}
                  isDisabled={isDisabled}
                />
                <Textarea
                  id="conceptual"
                  placeholder="Share your thoughts..."
                  value={commentConceptual}
                  onChange={(e) => setCommentConceptual(e.target.value)}
                  disabled={isDisabled}
                  className="mt-4 bg-gray-100 text-black placeholder-gray-500 focus:ring-2 focus:ring-purple-500 transition duration-300"
                />
              </div>
              {/* Repeat above block for other ratings */}
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

EvaluateStudent.propTypes = {
  params: PropTypes.shape({
    team: PropTypes.string.isRequired,
    student: PropTypes.string.isRequired,
  }).isRequired,
};
