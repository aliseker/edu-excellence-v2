using EduExcellenceV2.Application.DTOs;

namespace EduExcellenceV2.Application.Interfaces;

public interface IContactService
{
    Task SendContactEmailAsync(ContactRequestDto dto);
}

