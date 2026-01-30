import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

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

type HeaderProps = {
  favorites: number[];
  cart: BusinessIdea[];
  mockIdeas: BusinessIdea[];
  totalPrice: number;
  toggleFavorite: (id: number) => void;
  addToCart: (idea: BusinessIdea) => void;
  removeFromCart: (id: number) => void;
};

const Header = ({ favorites, cart, mockIdeas, totalPrice, toggleFavorite, addToCart, removeFromCart }: HeaderProps) => {
  return (
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
  );
};

export default Header;
