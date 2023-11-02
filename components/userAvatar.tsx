
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
import { Profile } from "../models"
import { IKImage } from "imagekitio-react"
import Avatar from "@mui/material/Avatar"

const avatarsImgs = [
    aligator, ant, ant2, bat, bear, bee, bird, bug, butterfly, butterfly2, butterfly3, camel,
    cat, caterpiller, cheetah, chicken, cow, cuccoon, dinosaur, dog, dolphin, dove, duck,
    eagle, elephant, fish, flamingo, fly, fly2, fox, frog, giraffe, gorilla, grasshopper, hippo,
    horse, insect, kangaroo, koala, leopard, lion, monkey, mouse, panda, parrot, penguin, seaDog,
    shark, sheep, snake, spider, spider2, squirrel, starfish, tiger, turtle, wolf, zebra
]

function uuidToInteger(uuid: string, options: number): number {
    // Remove dashes and convert the UUID to a hexadecimal string
    const hexString = uuid.replace(/-/g, '');
    // Convert the hexadecimal string to a decimal integer
    const decimalInteger = parseInt(hexString, 16);
    // Take a modulo operation to get a number between 0 and the number of avatars
    return decimalInteger % options;
}


export default function UserAvatar({profile, size=32}: {profile?: Profile | null, size?: number}) {

    if (profile?.avatar) {
        return (
            <Avatar sx={{width: size, height: size}}>
                <IKImage
                    width={size}
                    height={size}
                    path={`users/${profile?.avatar}`}
                    transformation={[{
                        height: size.toString(),
                        width: size.toString(),
                        dpr: "2"
                    }]}
                />
            </Avatar>
        );
    }

    const defaultAvatar =  <AccountCircle width={size} height={size} />
    const avatars = avatarsImgs.map((x, i) => <Image src={x} key={i} alt="Avatar" width={size} height={size} />)
    const n = profile?.id ? uuidToInteger(profile?.id, avatars.length) : null ;
    
    return (
        <>{n ? avatars[n] : defaultAvatar}</>
    );

}