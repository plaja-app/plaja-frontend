type Session = {
	User: User;
};

type UserType = {
	ID: number;
	Title: string;
};

type User = {
	ID: number;
	ProfilePic: string;
	FirstName: string;
	LastName: string;
	Email: string;
	UserType: UserType;
	CreatedAt: string;
};

type CourseCategory = {
	ID: number;
	Title: string;
};

type CourseLevel = {
	ID: number;
	Title: string;
};

type Course = {
	ID: number;
	Thumbnail: string;
	Title: string;
	Level: CourseLevel;
	Price: number;
	StatusID: number;
	ShortDescription: string;
	Description: string;
	Instructor: User;
	Length: number;
	HasCertificate: boolean;
	Categories: CourseCategory[];
};

type CourseCertificate = {
	ID: number,
	UserID: number,
	User: User,
	CourseID: number,
	Course: Course,
	CreatedAt: string,
	UpdatedAt: string,
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
