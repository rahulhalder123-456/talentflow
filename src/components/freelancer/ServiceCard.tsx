import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  name: string;
  avatarUrl: string;
  service: string;
  rating: number;
  reviews: number;
  price: number;
  imageUrl: string;
  dataAiHint: string;
}

export function ServiceCard({ name, avatarUrl, service, rating, reviews, price, imageUrl, dataAiHint }: ServiceCardProps) {
  return (
    <Link href="#" className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <Image src={imageUrl} alt={service} width={400} height={250} className="h-48 w-full object-cover" data-ai-hint={dataAiHint} />
        </CardHeader>
        <CardContent className="flex h-[calc(100%-12rem)] flex-col p-4">
          <div className="flex grow flex-col">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">{name}</h3>
            </div>
            <p className="mt-2 grow text-muted-foreground">{service}</p>
            <div className="mt-3 flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">({reviews})</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 pt-0">
          <Badge variant="outline">Top Rated</Badge>
          <p className="text-lg font-semibold">
            <span className="text-sm font-normal text-muted-foreground">From </span>
            <span className="text-primary">${price}</span>
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
