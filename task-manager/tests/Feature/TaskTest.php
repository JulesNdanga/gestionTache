<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_create_task()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/tasks', [
            'title' => 'Test Task',
            'description' => 'Test Description',
            'due_date' => '2024-12-31',
            'status' => false,
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['id', 'title', 'description', 'due_date', 'status']);
    }

    /** @test */
    public function user_can_update_task()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user, 'sanctum')->putJson("/api/tasks/{$task->id}", [
            'title' => 'Updated Task',
            'description' => 'Updated Description',
            'due_date' => '2024-12-31',
            'status' => true,
        ]);

        $response->assertStatus(200)
                 ->assertJson(['title' => 'Updated Task']);
    }

    /** @test */
    public function user_can_delete_task()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user, 'sanctum')->deleteJson("/api/tasks/{$task->id}");

        $response->assertStatus(204);
    }

    /** @test */
    public function user_can_list_tasks()
    {
        $user = User::factory()->create();
        Task::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/tasks');

        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }
}