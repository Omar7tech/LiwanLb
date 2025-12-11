<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Foundation\Auth\User as AuthUser;
use App\Models\UpdateComment;
use Illuminate\Auth\Access\HandlesAuthorization;

class UpdateCommentPolicy
{
    use HandlesAuthorization;
    
    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny:UpdateComment');
    }

    public function view(AuthUser $authUser, UpdateComment $updateComment): bool
    {
        return $authUser->can('View:UpdateComment');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create:UpdateComment');
    }

    public function update(AuthUser $authUser, UpdateComment $updateComment): bool
    {
        return $authUser->can('Update:UpdateComment');
    }

    public function delete(AuthUser $authUser, UpdateComment $updateComment): bool
    {
        return $authUser->can('Delete:UpdateComment');
    }

    public function restore(AuthUser $authUser, UpdateComment $updateComment): bool
    {
        return $authUser->can('Restore:UpdateComment');
    }

    public function forceDelete(AuthUser $authUser, UpdateComment $updateComment): bool
    {
        return $authUser->can('ForceDelete:UpdateComment');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny:UpdateComment');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny:UpdateComment');
    }

    public function replicate(AuthUser $authUser, UpdateComment $updateComment): bool
    {
        return $authUser->can('Replicate:UpdateComment');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder:UpdateComment');
    }

}