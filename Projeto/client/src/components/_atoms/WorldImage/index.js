import { Image } from './styles';

export const WorldImageType = {
    CommonWorld_01: "common_world_01"
};

const Images = {
    [WorldImageType.CommonWorld_01]: "/img/world_img_01.png"
};

export default function WorldImage() {
    return (
        <Image src={Images[WorldImageType.CommonWorld_01]} />
    );
}