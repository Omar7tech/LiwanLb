<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Foundation\Auth\User as AuthUser;
use App\Models\CostStudy;
use Illuminate\Auth\Access\HandlesAuthorization;

class CostStudyPolicy
{
    use HandlesAuthorization;
    
    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny:CostStudy');
    }

    public function view(AuthUser $authUser, CostStudy $costStudy): bool
    {
        return $authUser->can('View:CostStudy');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create:CostStudy');
    }

    public function update(AuthUser $authUser, CostStudy $costStudy): bool
    {
        return $authUser->can('Update:CostStudy');
    }

    public function delete(AuthUser $authUser, CostStudy $costStudy): bool
    {
        return $authUser->can('Delete:CostStudy');
    }

    public function restore(AuthUser $authUser, CostStudy $costStudy): bool
    {
        return $authUser->can('Restore:CostStudy');
    }

    public function forceDelete(AuthUser $authUser, CostStudy $costStudy): bool
    {
        return $authUser->can('ForceDelete:CostStudy');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny:CostStudy');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny:CostStudy');
    }

    public function replicate(AuthUser $authUser, CostStudy $costStudy): bool
    {
        return $authUser->can('Replicate:CostStudy');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder:CostStudy');
    }

}