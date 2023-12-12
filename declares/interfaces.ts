export interface User {
    user_id?: string;
    info?: UserInfo;
    images?: UserImage;
    theme_color?: string;
    view?: number;
    viewer?: string[];
}

export interface Image {
    filename?: string;
    url?: string;
}

export interface SocialUrl {
    name?: string;
    hyperlink?: string;
    url?: string;
}

export interface UserContact {
    phone?: string;
    email?: string;
    socials?: SocialUrl[];
}

export interface UserInfo {
    first_name?: string;
    last_name?: string;
    full_name?: string;
    nick_name?: string;
    bio?: string;
    description?: string;
    birth?: string;
    contact?: UserContact;
}

export interface UserNone {
    last_name?: string;
}

export interface UserImage {
    avatar?: Image[];
    cover?: Image[];
}
