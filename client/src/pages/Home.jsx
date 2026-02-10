import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Feature from "../components/Feature";
import RandomQuestions from "../components/RandomQuestions";
import CategorySelector from "../components/CategorySelector";
import Spinner from "../components/Spinner";


function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://theorypro-backend.onrender.com/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch categories:", err);
        setLoading(false);
      });
  }, []);

  const startQuiz = (category) => {
    navigate(`/quiz/${encodeURIComponent(category)}`);
  };

  if (loading) return <Spinner />;

  return (
    <>
      <Hero />
      <Feature />
      <RandomQuestions />
      <CategorySelector
        categories={categories.map(c => [c.category, c.count])}
        onSelect={startQuiz}
      />
    </>
  );
}

export default Home;
