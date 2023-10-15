
import Image from "next/image"

import aligator from '../resources/animals/alligator.svg'
import ant from '../resources/animals/ant.svg'
import ant2 from '../resources/animals/ant2.svg'
import bat from '../resources/animals/bat.svg'
import bear from '../resources/animals/bear.svg'
import bee from '../resources/animals/bee.svg'
import bird from '../resources/animals/bird.svg'
import bug from '../resources/animals/bug.svg'
import butterfly from '../resources/animals/butterfly.svg'
import butterfly2 from '../resources/animals/butterfly2.svg'
import butterfly3 from '../resources/animals/butterfly3.svg'
import camel from '../resources/animals/camel.svg'
import cat from '../resources/animals/cat.svg'
import caterpiller from '../resources/animals/caterpiller.svg'
import cheetah from '../resources/animals/cheetah.svg'
import chicken from '../resources/animals/chicken.svg'
import cow from '../resources/animals/cow.svg'
import cuccoon from '../resources/animals/cuccoon.svg'
import dinosaur from '../resources/animals/dinosaur.svg'
import dog from '../resources/animals/dog.svg'
import dolphin from '../resources/animals/dolphin.svg'
import dove from '../resources/animals/dove.svg'
import duck from '../resources/animals/duck.svg'
import eagle from '../resources/animals/eagle.svg'
import elephant from '../resources/animals/elephant.svg'
import fish from '../resources/animals/fish.svg'
import flamingo from '../resources/animals/flamingo.svg'
import fly from '../resources/animals/fly.svg'
import fly2 from '../resources/animals/fly2.svg'
import fox from '../resources/animals/fox.svg'
import frog from '../resources/animals/frog.svg'
import giraffe from '../resources/animals/giraffe.svg'
import gorilla from '../resources/animals/gorilla.svg'
import grasshopper from '../resources/animals/grasshopper.svg'
import hippo from '../resources/animals/hippo.svg'
import horse from '../resources/animals/horse.svg'
import insect from '../resources/animals/insect.svg'
import kangaroo from '../resources/animals/kangaroo.svg'
import koala from '../resources/animals/koala.svg'
import leopard from '../resources/animals/leopard.svg'
import lion from '../resources/animals/lion.svg'
import monkey from '../resources/animals/monkey.svg'
import mouse from '../resources/animals/mouse.svg'
import panda from '../resources/animals/panda.svg'
import parrot from '../resources/animals/parrot.svg'
import penguin from '../resources/animals/penguin.svg'
import seaDog from '../resources/animals/sea-dog.svg'
import shark from '../resources/animals/shark.svg'
import sheep from '../resources/animals/sheep.svg'
import snake from '../resources/animals/snake.svg'
import spider from '../resources/animals/spider.svg'
import spider2 from '../resources/animals/spider2.svg'
import squirrel from '../resources/animals/squirrel.svg'
import starfish from '../resources/animals/starfish.svg'
import tiger from '../resources/animals/tiger.svg'
import turtle from '../resources/animals/turtle.svg'
import wolf from '../resources/animals/wolf.svg'
import zebra from '../resources/animals/zebra.svg'
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";


export default function UserAvatar({uuid, size=32}: {uuid?: string | null, size?: number}) {

    const avatars = [
        <AccountCircle width={size} height={size} />,
        <Image src={aligator} alt="Avatar" width={size} height={size} />,
        <Image src={ant} alt="Avatar" width={size} height={size} />,
        <Image src={ant2} alt="Avatar" width={size} height={size} />,
        <Image src={bat} alt="Avatar" width={size} height={size} />,
        <Image src={bear} alt="Avatar" width={size} height={size} />,
        <Image src={bee} alt="Avatar" width={size} height={size} />,
        <Image src={bird} alt="Avatar" width={size} height={size} />,
        <Image src={bug} alt="Avatar" width={size} height={size} />,
        <Image src={butterfly} alt="Avatar" width={size} height={size} />,
        <Image src={butterfly2} alt="Avatar" width={size} height={size} />,
        <Image src={butterfly3} alt="Avatar" width={size} height={size} />,
        <Image src={camel} alt="Avatar" width={size} height={size} />,
        <Image src={cat} alt="Avatar" width={size} height={size} />,
        <Image src={caterpiller} alt="Avatar" width={size} height={size} />,
        <Image src={cheetah} alt="Avatar" width={size} height={size} />,
        <Image src={chicken} alt="Avatar" width={size} height={size} />,
        <Image src={cow} alt="Avatar" width={size} height={size} />,
        <Image src={cuccoon} alt="Avatar" width={size} height={size} />,
        <Image src={dinosaur} alt="Avatar" width={size} height={size} />,
        <Image src={dog} alt="Avatar" width={size} height={size} />,
        <Image src={dolphin} alt="Avatar" width={size} height={size} />,
        <Image src={dove} alt="Avatar" width={size} height={size} />,
        <Image src={duck} alt="Avatar" width={size} height={size} />,
        <Image src={eagle} alt="Avatar" width={size} height={size} />,
        <Image src={elephant} alt="Avatar" width={size} height={size} />,
        <Image src={fish} alt="Avatar" width={size} height={size} />,
        <Image src={flamingo} alt="Avatar" width={size} height={size} />,
        <Image src={fly} alt="Avatar" width={size} height={size} />,
        <Image src={fly2} alt="Avatar" width={size} height={size} />,
        <Image src={fox} alt="Avatar" width={size} height={size} />,
        <Image src={frog} alt="Avatar" width={size} height={size} />,
        <Image src={giraffe} alt="Avatar" width={size} height={size} />,
        <Image src={gorilla} alt="Avatar" width={size} height={size} />,
        <Image src={grasshopper} alt="Avatar" width={size} height={size} />,
        <Image src={hippo} alt="Avatar" width={size} height={size} />,
        <Image src={horse} alt="Avatar" width={size} height={size} />,
        <Image src={insect} alt="Avatar" width={size} height={size} />,
        <Image src={kangaroo} alt="Avatar" width={size} height={size} />,
        <Image src={koala} alt="Avatar" width={size} height={size} />,
        <Image src={leopard} alt="Avatar" width={size} height={size} />,
        <Image src={lion} alt="Avatar" width={size} height={size} />,
        <Image src={monkey} alt="Avatar" width={size} height={size} />,
        <Image src={mouse} alt="Avatar" width={size} height={size} />,
        <Image src={panda} alt="Avatar" width={size} height={size} />,
        <Image src={parrot} alt="Avatar" width={size} height={size} />,
        <Image src={penguin} alt="Avatar" width={size} height={size} />,
        <Image src={seaDog} alt="Avatar" width={size} height={size} />,
        <Image src={shark} alt="Avatar" width={size} height={size} />,
        <Image src={sheep} alt="Avatar" width={size} height={size} />,
        <Image src={snake} alt="Avatar" width={size} height={size} />,
        <Image src={spider} alt="Avatar" width={size} height={size} />,
        <Image src={spider2} alt="Avatar" width={size} height={size} />,
        <Image src={squirrel} alt="Avatar" width={size} height={size} />,
        <Image src={starfish} alt="Avatar" width={size} height={size} />,
        <Image src={tiger} alt="Avatar" width={size} height={size} />,
        <Image src={turtle} alt="Avatar" width={size} height={size} />,
        <Image src={wolf} alt="Avatar" width={size} height={size} />,
        <Image src={zebra} alt="Avatar" width={size} height={size} />
    ]

    function uuidToInteger(uuid: string): number {
        // Remove dashes and convert the UUID to a hexadecimal string
        const hexString = uuid.replace(/-/g, '');
        // Convert the hexadecimal string to a decimal integer
        const decimalInteger = parseInt(hexString, 16);
        // Take a modulo operation to get a number between 0 and the number of avatars
        return decimalInteger % avatars.length;
    }

    const [number, setNumber] = useState(0);

    useEffect(() => {
        if (uuid) {
            setNumber(uuidToInteger(uuid))
        }
    }, [uuid]);
    
    return (
        <>{avatars[number]}</>
    );

}