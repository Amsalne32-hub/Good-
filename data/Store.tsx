
import React from 'react';
import type { StudentProfile, StoreItem } from '../types';
import { storeItems } from './storeItems';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './Card';
import { Button } from '../components/ui/Button';
import { Star, CheckCircle, Palette, ChevronLeft } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface StoreItemCardProps {
    item: StoreItem;
    profile: StudentProfile;
    onPurchase: (item: StoreItem) => void;
    onEquip: (item: StoreItem) => void;
}

const StoreItemCard: React.FC<StoreItemCardProps> = ({ item, profile, onPurchase, onEquip }) => {
    const ownsItem = profile.inventory.includes(item.id);
    const isEquipped = profile.equippedTheme === item.id;
    const canAfford = profile.questPoints >= item.price;

    let button;
    if (isEquipped) {
        button = <Button disabled className="w-full bg-success hover:bg-success/90"><CheckCircle className="w-4 h-4 mr-2"/> Equipped</Button>;
    } else if (ownsItem) {
        button = <Button onClick={() => onEquip(item)} variant="outline" className="w-full">Equip Theme</Button>;
    } else {
        button = <Button onClick={() => onPurchase(item)} disabled={!canAfford} className="w-full">
            {canAfford ? 'Buy Now' : 'Not Enough QP'}
        </Button>;
    }

    return (
        <Card className="flex flex-col">
            <div className={`h-32 w-full rounded-t-xl ${item.preview}`}></div>
            <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription className="h-10">{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-muted-foreground">Price:</span>
                    <div className="flex items-center gap-1 font-bold text-amber-600 text-lg">
                        <Star className="w-5 h-5 fill-current"/>
                        {item.price}
                    </div>
                </div>
                {button}
            </CardContent>
        </Card>
    );
};

interface StoreProps {
    studentProfile: StudentProfile;
    onPurchase: (item: StoreItem) => void;
    onEquip: (item: StoreItem) => void;
    onBack: () => void;
}

const Store: React.FC<StoreProps> = ({ studentProfile, onPurchase, onEquip, onBack }) => {
    const themes = storeItems.filter(item => item.type === 'theme');

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-left">
                <Button variant="ghost" onClick={onBack} className="mb-4 -ml-4">
                    <ChevronLeft className="w-4 h-4 mr-2" /> Back to Journey
                </Button>
            </div>
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">Student Store</h1>
                    <p className="text-muted-foreground mt-1">Spend your hard-earned Quest Points!</p>
                </div>
                <div className="flex items-center gap-2 font-bold text-xl px-4 py-2 rounded-lg bg-amber-100 text-amber-800 border border-amber-200">
                    <Star className="w-6 h-6 fill-current" />
                    <span>{studentProfile.questPoints} QP</span>
                </div>
            </header>

            <section>
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-4"><Palette className="text-primary"/> Application Themes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {themes.map(item => (
                        <StoreItemCard 
                            key={item.id}
                            item={item}
                            profile={studentProfile}
                            onPurchase={onPurchase}
                            onEquip={onEquip}
                        />
                    ))}
                </div>
            </section>

            {/* Future sections can be added here, e.g., Avatar Frames */}
            {/* 
            <section className="mt-12">
                 <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">Avatar Frames</h2>
                 <div className="text-center py-16 text-muted-foreground bg-slate-100 rounded-lg">
                    <p>More items coming soon!</p>
                 </div>
            </section>
            */}
        </div>
    );
};

export default Store;
