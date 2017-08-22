export interface Event {
    name:string;
    startDate:string;
    endDate:string;
    locations:Location[];
    activities:Activity[]
}

export interface Location {
    id:string;
    name:string;
}

export interface Activity {
    name:string;
    description:string;
    startTime:string;
    endTime:string;
    location:Location;
    responsibles:string[];
    indexed:boolean;
    activityItems:ActivityItem[];
}

export interface ActivityItem {
    name:string;
    description:string;
    startTime:string;
    endTime:string;
    location:Location;
    responsibles:string[];
}