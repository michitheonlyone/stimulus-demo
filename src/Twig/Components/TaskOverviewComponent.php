<?php

namespace App\Twig\Components;

use App\Repository\TaskRepository;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent]
final class TaskOverviewComponent
{
    use DefaultActionTrait;

    public function __construct(private TaskRepository $taskRepository) {}

    public function getTasks(): array
    {
        return $this->taskRepository->findAll();
    }
}
