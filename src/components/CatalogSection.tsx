import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

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

type CatalogSectionProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filteredIdeas: BusinessIdea[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
  addToCart: (idea: BusinessIdea) => void;
  setSelectedIdea: (idea: BusinessIdea | null) => void;
  selectedIdea: BusinessIdea | null;
  categories: string[];
};

const CatalogSection = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  filteredIdeas,
  favorites,
  toggleFavorite,
  addToCart,
  setSelectedIdea,
  selectedIdea,
  categories
}: CatalogSectionProps) => {
  return (
    <>
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
    </>
  );
};

export default CatalogSection;
