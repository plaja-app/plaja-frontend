type CourseCategory = {
	ID: number,
	Title: string,
}

type User = {
	ID: number,
	FirstName: string,
	LastName: string,
	Email: string,
	UserName: string,
}

type CourseLevel = {
	ID: number,
	Title: string,
}

type Course = {
	ID: number,
	Thumbnail: string,
	Title: string,
	Level: CourseLevel,
	Price: number,
	ShortDescription: string,
	Description: string,
	Instructor: User,
	HasCertificate: boolean,
	Categories: CourseCategory[],
}

type CookieAttributes = {
	value: string;
	maxAge?: number;
	httpOnly?: boolean;
	sameSite?: 'Lax' | 'Strict' | 'None';
};

type Cookie = {
	name: string;
	attributes: CookieAttributes;
};