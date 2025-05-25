using Application.DTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.Mapping;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserResponse>(); // domain → DTO tek yonlu mapping
        CreateMap<Account, AccountResponse>();
        CreateMap<Transfer, TransferResponse>(); // ekle
    }
}