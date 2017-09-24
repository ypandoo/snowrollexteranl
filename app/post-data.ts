export class Post {
    post_id: number;
    post_type: number;
    username: string;
    user_id: number;
    user_image_url: string;
    created_at: string;
    description: string;
    num_images: number;
    image_url: string;
    image2_url: string;
    image3_url: string;
    image4_url: string;
    image5_url: string;
    images: Array<string>;
    img_grid: string;
    more_img_count: number;
    likes: number;
    location: string;
    range: string;
    audio1_url: string;
    audio1_x: number;
    audio1_y: number;
    audio2_url: string;
    audio2_x: number;
    audio2_y: number;
    audio3_url: string;
    audio3_x: number;
    audio3_y: number;
    audio: Audio[];
    num_comments: number;
    comments: Comments[];
    music:Music;
}

export class Audio {
    url: string;
    x: number;
    y: number;
}

export class Comments {
    username: string;
    user_image_url: string;
    created_at: string;
    comment: string;
    location: string;
}

export class Music {
    image_audio1: string;
    image_audio1_x: number;
    image_audio1_y: number;
    music_album: string;
    music_artist: string;
    music_cover_url: string;
    music_id: string;
    music_source: string;
    music_title: string;
    photo: string;
}
