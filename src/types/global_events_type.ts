
export type GlobalEventTypes = {
    is_loading: boolean;
    
    alert_status_updated: AlertStatusChangedEventInterface;

    close_modal: CloseModalEventInterface;

};


export interface AlertStatusOptionsInterface { 
    duration?: number; 
    should_reload?: boolean; 
    redirect_url?: string; 
    close_modal?: boolean; 
}; 

export interface AlertStatusChangedEventInterface {
    status: string;
    msg: string;
    options?: AlertStatusOptionsInterface
}

export interface CloseModalEventInterface {
    modal_index?: number
}
