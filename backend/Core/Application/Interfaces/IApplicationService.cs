using EduExcellenceV2.Application.DTOs;

namespace EduExcellenceV2.Application.Interfaces;

public interface IApplicationService
{
    Task SubmitApplicationAsync(ApplicationRequestDto dto);
}
