import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <>
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
    </>
  );
};

export default Footer;
