import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CatalogSection from '@/components/CatalogSection';
import Footer from '@/components/Footer';

type BusinessIdea = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  investment: string;
  payback: string;
};

const mockIdeas: BusinessIdea[] = [
  {
    id: 1,
    title: "Автоматизированная кофейня",
    description: "Кофейня с роботом-бариста без персонала. Полная автоматизация процесса.",
    price: 15000,
    rating: 4.8,
    reviews: 124,
    category: "HoReCa",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    investment: "2-5 млн ₽",
    payback: "12-18 мес"
  },
  {
    id: 2,
    title: "Онлайн-школа нейросетей",
    description: "Образовательная платформа по работе с AI для бизнеса и личных целей.",
    price: 12000,
    rating: 4.9,
    reviews: 89,
    category: "Образование",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    investment: "300-500 тыс ₽",
    payback: "6-9 мес"
  },
  {
    id: 3,
    title: "Сервис аренды гаджетов",
    description: "Платформа для краткосрочной аренды электроники: камеры, дроны, VR.",
    price: 18000,
    rating: 4.7,
    reviews: 156,
    category: "Технологии",
    image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&q=80",
    investment: "1-3 млн ₽",
    payback: "10-14 мес"
  },
  {
    id: 4,
    title: "Экологичная упаковка",
    description: "Производство биоразлагаемой упаковки для ресторанов и магазинов.",
    price: 20000,
    rating: 4.6,
    reviews: 93,
    category: "Производство",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&q=80",
    investment: "5-10 млн ₽",
    payback: "18-24 мес"
  },
  {
    id: 5,
    title: "Сервис личного помощника",
    description: "AI-ассистент для планирования дня, встреч и напоминаний через Telegram.",
    price: 8000,
    rating: 4.9,
    reviews: 201,
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800&q=80",
    investment: "100-300 тыс ₽",
    payback: "3-6 мес"
  },
  {
    id: 6,
    title: "Мобильный груминг",
    description: "Выездной салон красоты для домашних питомцев на базе микроавтобуса.",
    price: 11000,
    rating: 4.5,
    reviews: 67,
    category: "Услуги",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
    investment: "800 тыс - 1.5 млн ₽",
    payback: "12-15 мес"
  }
];

const Index = () => {
  const [cart, setCart] = useState<BusinessIdea[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIdea, setSelectedIdea] = useState<BusinessIdea | null>(null);

  const categories = ['all', 'HoReCa', 'Образование', 'Технологии', 'Производство', 'SaaS', 'Услуги'];

  const filteredIdeas = mockIdeas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         idea.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || idea.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const addToCart = (idea: BusinessIdea) => {
    if (!cart.find(item => item.id === idea.id)) {
      setCart([...cart, idea]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        favorites={favorites}
        cart={cart}
        mockIdeas={mockIdeas}
        totalPrice={totalPrice}
        toggleFavorite={toggleFavorite}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
      
      <HeroSection />
      
      <CatalogSection 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        filteredIdeas={filteredIdeas}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        addToCart={addToCart}
        setSelectedIdea={setSelectedIdea}
        selectedIdea={selectedIdea}
        categories={categories}
      />
      
      <Footer />
    </div>
  );
};

export default Index;
