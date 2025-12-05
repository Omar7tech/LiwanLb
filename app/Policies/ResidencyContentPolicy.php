<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Foundation\Auth\User as AuthUser;
use App\Models\ResidencyContent;
use Illuminate\Auth\Access\HandlesAuthorization;

class ResidencyContentPolicy
{
    use HandlesAuthorization;
    
    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny:ResidencyContent');
    }

    public function view(AuthUser $authUser, ResidencyContent $residencyContent): bool
    {
        return $authUser->can('View:ResidencyContent');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create:ResidencyContent');
    }

    public function update(AuthUser $authUser, ResidencyContent $residencyContent): bool
    {
        return $authUser->can('Update:ResidencyContent');
    }

    public function delete(AuthUser $authUser, ResidencyContent $residencyContent): bool
    {
        return $authUser->can('Delete:ResidencyContent');
    }

    public function restore(AuthUser $authUser, ResidencyContent $residencyContent): bool
    {
        return $authUser->can('Restore:ResidencyContent');
    }

    public function forceDelete(AuthUser $authUser, ResidencyContent $residencyContent): bool
    {
        return $authUser->can('ForceDelete:ResidencyContent');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny:ResidencyContent');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny:ResidencyContent');
    }

    public function replicate(AuthUser $authUser, ResidencyContent $residencyContent): bool
    {
        return $authUser->can('Replicate:ResidencyContent');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder:ResidencyContent');
    }

}