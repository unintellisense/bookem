// defines the shape of the return from www.googleapis.com/books/v1/volumes?q=isbn:dddddddddd

export interface GoogleBooksVolumeSearch {
  kind: string;
  totalItems: number;
  items?: Book[];
}

interface Book {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
}

interface VolumeInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IndustryIdentifier[];
  pageCount: number;
  printType: string;
  categories: string[];
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

interface IndustryIdentifier {
  type: string; // this seems to tell us the type of isbn
  identifier: string; // this tells us the isbn, probably without any formatting
}

// defines shape of the object we will use for presentation
export interface SearchResultBook {
  title: VolumeInfo['title']
  description: VolumeInfo['description']
}