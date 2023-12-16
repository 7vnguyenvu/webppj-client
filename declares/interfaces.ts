export interface Account {
    locked?: boolean;
    role?: number;
    user_id?: string;
}

export interface User {
    users(users: any): unknown;
    _id?: string;
    user_id?: string;
    info?: UserInfo;
    images?: UserImage;
    theme_color?: string;
    view?: number;
    viewer?: string[];
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
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

export interface LayoutItemColConfig {
    xs?: Record<string, any>;
    sm?: Record<string, any>;
    md?: Record<string, any>;
    lg?: Record<string, any>;
    xl?: Record<string, any>;
    xxl?: Record<string, any>;
}

export interface LayoutItem {
    type?: string;
    colConfig?: LayoutItemColConfig;
    styles?: Record<string, string | number>;
}

export interface LayoutRender {
    _id?: string;
    layout_id?: string;
    name?: string;
    item?: LayoutItem[];
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}

export interface BlogContent {
    thumbnail?: Image;
    title?: string;
    content?: string;
}

export interface Blog {
    _id?: string;
    blog_id?: string;
    owner_id?: string;
    content?: BlogContent;
    hidden?: boolean;
    locked?: boolean;
    pin?: boolean;
    view?: number;
    like?: number;
    comment?: number;
    share: number;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}
