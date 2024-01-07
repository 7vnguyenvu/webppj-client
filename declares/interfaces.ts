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
    like?: number;
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

export class ImageStatus {
    hide?: boolean;
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
    thumbnail?: Image[];
    title?: string;
    content?: string;
}

export interface BlogOwner {
    name?: string;
    avatar?: Image[];
    page_url?: string;
}

export interface Blog {
    _id?: string;
    blog_id?: string;
    owner?: BlogOwner;
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

export interface PublicPageImages {
    background?: ImageStatus;
    avatar?: ImageStatus;
    cover?: ImageStatus[];
}

export interface PublicPageShow {
    name?: string;
    slogan?: string;
    images?: PublicPageImages;
}

export interface Interaction {
    star?: number;
    like?: number;
    cmt?: number;
    share?: number;
}

export interface InteractionContent {
    viewer?: number;
    blog?: number;
    link?: number;
    owner_avatar?: string;
}

export interface PublicPageInfo {
    vertical?: boolean;
    info?: Interaction;
}

export interface PageInfoContent {
    vertical?: boolean;
    info?: InteractionContent;
}

export interface Page {
    _id?: string;
    page_id?: string;
    owner_id?: string;
    layout_id?: string;
    thumbnail?: Image;
    show?: PublicPageShow;
    pageinfo?: PublicPageInfo;
    pageinfocontent?: PageInfoContent;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}

export interface Event {
    _id?: string;
    blog_id?: string;
    owner?: BlogOwner;
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
