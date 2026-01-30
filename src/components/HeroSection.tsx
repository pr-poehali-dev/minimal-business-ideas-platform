import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
