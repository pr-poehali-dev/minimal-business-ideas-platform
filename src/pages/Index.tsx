import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

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
      <header className="sticky top-0 z-50 glass border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                BizIdeas
              </h1>
              <nav className="hidden md:flex gap-6">
                <a href="#catalog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Каталог
                </a>
                <a href="#support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Поддержка
                </a>
                <a href="#contacts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Контакты
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="Heart" size={20} />
                    {favorites.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        {favorites.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Избранное</SheetTitle>
                    <SheetDescription>
                      {favorites.length === 0 ? 'Нет избранных идей' : `${favorites.length} идей в избранном`}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {mockIdeas.filter(idea => favorites.includes(idea.id)).map(idea => (
                      <Card key={idea.id} className="glass">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">{idea.title}</CardTitle>
                        </CardHeader>
                        <CardFooter className="pt-0 flex gap-2">
                          <Button size="sm" className="flex-1" onClick={() => addToCart(idea)}>
                            В корзину
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => toggleFavorite(idea.id)}>
                            <Icon name="X" size={16} />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                    <SheetDescription>
                      {cart.length === 0 ? 'Корзина пуста' : `${cart.length} товаров на сумму ${totalPrice.toLocaleString()} ₽`}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cart.map(idea => (
                      <Card key={idea.id} className="glass">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">{idea.title}</CardTitle>
                          <CardDescription>{idea.price.toLocaleString()} ₽</CardDescription>
                        </CardHeader>
                        <CardFooter className="pt-0">
                          <Button size="sm" variant="destructive" onClick={() => removeFromCart(idea.id)} className="w-full">
                            Удалить
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                    {cart.length > 0 && (
                      <div className="pt-4 border-t space-y-4">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Итого:</span>
                          <span>{totalPrice.toLocaleString()} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Перейти к оплате
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Avatar className="cursor-pointer hover-scale">
                <AvatarFallback>ИП</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Готовые бизнес-идеи с полным анализом
            </h2>
            <p className="text-xl text-muted-foreground">
              Покупайте проработанные бизнес-планы с финансовым анализом, маркетинговой стратегией и пошаговыми инструкциями
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" className="hover-scale">
                Смотреть каталог
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="hover-scale">
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Поиск бизнес-идей..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat === 'all' ? 'Все категории' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIdeas.map((idea, index) => (
              <Card 
                key={idea.id} 
                className="glass hover-scale cursor-pointer animate-scale-in overflow-hidden group"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedIdea(idea)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={idea.image} 
                    alt={idea.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(idea.id);
                    }}
                  >
                    <Icon 
                      name="Heart" 
                      size={18} 
                      className={favorites.includes(idea.id) ? 'fill-primary text-primary' : ''}
                    />
                  </Button>
                  <Badge className="absolute bottom-2 left-2">{idea.category}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{idea.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{idea.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <span className="text-sm font-medium">{idea.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({idea.reviews} отзывов)</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Инвестиции:</span>
                      <span className="font-medium">{idea.investment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Окупаемость:</span>
                      <span className="font-medium">{idea.payback}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(idea);
                    }}
                  >
                    {idea.price.toLocaleString()} ₽
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIdea(idea);
                    }}
                  >
                    Подробнее
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {selectedIdea && (
        <Sheet open={!!selectedIdea} onOpenChange={() => setSelectedIdea(null)}>
          <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
            <SheetHeader>
              <div className="relative h-48 -mx-6 -mt-6 mb-4">
                <img 
                  src={selectedIdea.image} 
                  alt={selectedIdea.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <SheetTitle className="text-2xl">{selectedIdea.title}</SheetTitle>
                  <SheetDescription className="mt-2">{selectedIdea.description}</SheetDescription>
                </div>
                <Badge>{selectedIdea.category}</Badge>
              </div>
            </SheetHeader>
            
            <Tabs defaultValue="overview" className="mt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Обзор</TabsTrigger>
                <TabsTrigger value="analysis">Анализ</TabsTrigger>
                <TabsTrigger value="manual">Мануал</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="flex items-center gap-4 p-4 glass rounded-lg">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={20} className="fill-primary text-primary" />
                    <span className="text-lg font-semibold">{selectedIdea.rating}</span>
                  </div>
                  <span className="text-muted-foreground">на основе {selectedIdea.reviews} отзывов</span>
                </div>
                
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-lg">Финансовые параметры</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Инвестиции:</span>
                      <span className="font-semibold">{selectedIdea.investment}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Окупаемость:</span>
                      <span className="font-semibold">{selectedIdea.payback}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Стоимость материалов:</span>
                      <span className="font-semibold">{selectedIdea.price.toLocaleString()} ₽</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-lg">Что входит в пакет</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>Детальный бизнес-план на 30+ страниц</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>Финансовая модель с расчётами</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>Маркетинговая стратегия</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>Пошаговая инструкция запуска</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>Список поставщиков и партнёров</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        <span>30 дней поддержки эксперта</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analysis" className="space-y-4">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>SWOT-анализ</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-green-400">Сильные стороны</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Высокий спрос на рынке</li>
                        <li>• Низкая конкуренция</li>
                        <li>• Масштабируемая модель</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-yellow-400">Возможности</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Рост рынка 15% в год</li>
                        <li>• Поддержка государства</li>
                        <li>• Экспорт услуг</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-red-400">Слабые стороны</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Высокий порог входа</li>
                        <li>• Зависимость от поставщиков</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-orange-400">Угрозы</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Изменение законодательства</li>
                        <li>• Рост цен на сырьё</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Целевая аудитория</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Возраст:</strong> 25-45 лет</p>
                    <p><strong>Доход:</strong> средний и выше среднего</p>
                    <p><strong>География:</strong> города 500K+ населения</p>
                    <p><strong>Интересы:</strong> технологии, качество жизни, экология</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="manual" className="space-y-4">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Этапы запуска</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { step: 1, title: "Регистрация бизнеса", duration: "1-2 недели", desc: "Выбор формы, регистрация ИП/ООО, открытие счёта" },
                      { step: 2, title: "Поиск помещения", duration: "2-4 недели", desc: "Анализ локаций, переговоры с арендодателями" },
                      { step: 3, title: "Закупка оборудования", duration: "3-6 недель", desc: "Выбор поставщиков, заказ, монтаж оборудования" },
                      { step: 4, title: "Найм персонала", duration: "2-3 недели", desc: "Размещение вакансий, собеседования, обучение" },
                      { step: 5, title: "Маркетинг и запуск", duration: "2-4 недели", desc: "Создание сайта, соцсети, реклама, soft opening" }
                    ].map(item => (
                      <div key={item.step} className="flex gap-4 pb-4 border-b last:border-0">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold">{item.title}</h4>
                            <Badge variant="outline">{item.duration}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex gap-3 mt-6 pt-6 border-t sticky bottom-0 bg-background">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => toggleFavorite(selectedIdea.id)}
              >
                <Icon 
                  name="Heart" 
                  size={18} 
                  className={`mr-2 ${favorites.includes(selectedIdea.id) ? 'fill-primary text-primary' : ''}`}
                />
                {favorites.includes(selectedIdea.id) ? 'В избранном' : 'В избранное'}
              </Button>
              <Button 
                className="flex-1"
                onClick={() => {
                  addToCart(selectedIdea);
                  setSelectedIdea(null);
                }}
              >
                Купить за {selectedIdea.price.toLocaleString()} ₽
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}

      <section id="support" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">Поддержка</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: "MessageCircle", title: "Чат поддержки", desc: "Ответим в течение 5 минут" },
                { icon: "Mail", title: "Email", desc: "support@bizideas.ru" },
                { icon: "Phone", title: "Телефон", desc: "+7 (495) 123-45-67" }
              ].map((item, i) => (
                <Card key={i} className="glass hover-scale cursor-pointer text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name={item.icon as any} size={24} className="text-primary" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer id="contacts" className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                BizIdeas
              </h4>
              <p className="text-sm text-muted-foreground">
                Маркетплейс готовых бизнес-идей с детальным анализом
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Компания</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Карьера</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Поддержка</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Политика</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Соцсети</h5>
              <div className="flex gap-3">
                {['MessageCircle', 'Instagram', 'Youtube'].map((social) => (
                  <Button key={social} size="icon" variant="ghost" className="hover-scale">
                    <Icon name={social as any} size={20} />
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 BizIdeas. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
