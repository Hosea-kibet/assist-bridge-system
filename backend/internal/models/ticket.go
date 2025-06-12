
package models

import (
    "time"
    "github.com/google/uuid"
    "gorm.io/gorm"
)

type TicketStatus string
type TicketPriority string
type TicketSource string

const (
    StatusOpen       TicketStatus = "open"
    StatusInProgress TicketStatus = "in-progress"
    StatusResolved   TicketStatus = "resolved"
    StatusClosed     TicketStatus = "closed"
)

const (
    PriorityLow      TicketPriority = "low"
    PriorityMedium   TicketPriority = "medium"
    PriorityHigh     TicketPriority = "high"
    PriorityCritical TicketPriority = "critical"
)

const (
    SourceWeb      TicketSource = "web"
    SourceEmail    TicketSource = "email"
    SourcePhone    TicketSource = "phone"
    SourceWhatsApp TicketSource = "whatsapp"
)

type Ticket struct {
    ID             uuid.UUID      `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
    TicketNumber   string         `json:"ticket_number" gorm:"uniqueIndex;not null"`
    Title          string         `json:"title" gorm:"not null"`
    Description    string         `json:"description" gorm:"type:text"`
    Status         TicketStatus   `json:"status" gorm:"default:'open'"`
    Priority       TicketPriority `json:"priority" gorm:"default:'medium'"`
    Source         TicketSource   `json:"source" gorm:"not null"`
    
    // Customer information
    CustomerName   string `json:"customer_name" gorm:"not null"`
    CustomerEmail  string `json:"customer_email"`
    CustomerPhone  string `json:"customer_phone"`
    
    // Assignment
    AssignedToID   *uuid.UUID `json:"assigned_to_id" gorm:"type:uuid"`
    AssignedTo     *User      `json:"assigned_to" gorm:"foreignKey:AssignedToID"`
    
    // Metadata
    ExternalID     string `json:"external_id"` // For tracking external sources
    Tags           []Tag  `json:"tags" gorm:"many2many:ticket_tags;"`
    
    // Timestamps
    CreatedAt time.Time      `json:"created_at"`
    UpdatedAt time.Time      `json:"updated_at"`
    DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`
    
    // Related data
    Comments []Comment `json:"comments" gorm:"foreignKey:TicketID"`
}

type Comment struct {
    ID       uuid.UUID `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
    TicketID uuid.UUID `json:"ticket_id" gorm:"type:uuid;not null"`
    UserID   uuid.UUID `json:"user_id" gorm:"type:uuid;not null"`
    Content  string    `json:"content" gorm:"type:text;not null"`
    IsPublic bool      `json:"is_public" gorm:"default:false"`
    
    CreatedAt time.Time      `json:"created_at"`
    UpdatedAt time.Time      `json:"updated_at"`
    DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`
    
    User User `json:"user" gorm:"foreignKey:UserID"`
}

type User struct {
    ID       uuid.UUID `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
    Name     string    `json:"name" gorm:"not null"`
    Email    string    `json:"email" gorm:"uniqueIndex;not null"`
    Role     string    `json:"role" gorm:"default:'agent'"`
    IsActive bool      `json:"is_active" gorm:"default:true"`
    
    CreatedAt time.Time      `json:"created_at"`
    UpdatedAt time.Time      `json:"updated_at"`
    DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`
}

type Tag struct {
    ID    uuid.UUID `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
    Name  string    `json:"name" gorm:"uniqueIndex;not null"`
    Color string    `json:"color" gorm:"default:'#3B82F6'"`
    
    CreatedAt time.Time      `json:"created_at"`
    UpdatedAt time.Time      `json:"updated_at"`
    DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`
}

// BeforeCreate generates a ticket number
func (t *Ticket) BeforeCreate(tx *gorm.DB) error {
    if t.TicketNumber == "" {
        var count int64
        tx.Model(&Ticket{}).Count(&count)
        t.TicketNumber = fmt.Sprintf("T-%05d", count+1)
    }
    return nil
}
